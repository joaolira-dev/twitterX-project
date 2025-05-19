import { RequestHandler } from "express";
import { signupSchema } from "../schemas/signup-schema";
import { createUser, findUserByEmail, findUserByUserName } from "../services/user";
import slug from "slug";
import { hash } from "bcrypt-ts";
import jwt from "jsonwebtoken"
import { createJWT } from "../helpers/jwt";

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