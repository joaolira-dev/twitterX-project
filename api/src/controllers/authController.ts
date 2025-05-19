import { RequestHandler } from "express";
import { compare } from "bcrypt-ts"
import { signupSchema } from "../schemas/signup-schema";
import { createUser, findUserByEmail, findUserByUserName } from "../services/user";
import slug from "slug";
import { hash } from "bcrypt-ts";
import { createJWT } from "../helpers/jwt";
import { signinSchema } from "../schemas/signin-schema";

export const signup: RequestHandler = async (req,res) => {
   const safeData = signupSchema.safeParse(req.body)
   if(!safeData.success) {
      res.json({ error: safeData.error.flatten().fieldErrors })
      return 
   }
   const hasEmail = await findUserByEmail(safeData.data.email)
   if(hasEmail) {
      res.json({error: "E-mail já existe"})
      return
   }
   // validar nickname
   let generateSlug = true
   let userName = slug(safeData.data.name)
   while(generateSlug ) {
      const hasUserName = await findUserByUserName(userName)
      if(hasUserName) {
         let slugSuffix = Math.floor(Math.random() * 999999).toString() 
         userName = slug(safeData.data.name + slugSuffix)
      } else {
         generateSlug = false
      }
   }
   // gerar hash de senha
   const hashPassword = await hash(safeData.data.password, 10)
   // cria usuario
   const newUser = await createUser({
      username: userName,
      name: safeData.data.name,
      email: safeData.data.email,
      password: hashPassword
   })

  

   // cria o token 
   const token = createJWT(userName)
   res.status(201).json({
      token,
      user: {
         name: newUser.name,
         username: newUser.username,
         avatar: newUser.avatar
      }
   })
}

export const signin: RequestHandler = async (req,res) => {
 const safeData = signinSchema.safeParse(req.body)
   if(!safeData.success) {
      res.json({ error: safeData.error.flatten().fieldErrors })
      return 
   }

   const user = await findUserByEmail(safeData.data.email)
   if(!user) {
      res.status(401).json({ error: "E-mail ou senha inválidos" })
      return
   }

   const match = await compare(safeData.data.password, user.password)
   if(!match) {
      res.json({ error: "E-mail ou senha inválidos" })
      return
   }
   const token = createJWT(user.username)

   res.json({
      token,
      user: {
         name: user.name,
         username: user.username,
         avatar: user.avatar
      }
   })
}