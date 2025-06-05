import e, { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { findUserByUserName } from "../services/user";
import { updateAvatar } from "../services/avatar";
import { getPublicURL } from "../helpers/url";

export const uploadAvatar = async (req: ExtendedRequest, res: Response) => {
   const file = req.file

   if(!file) {
      res.status(500).json({ error: "Error ao fazer o upload da foto!"})
      return
   }

   const user = await findUserByUserName(req.username as string)
   const avatarUrl = getPublicURL(file.filename)
   await updateAvatar(user?.username as string, avatarUrl)
   
   res.status(200).json({
      message: "Avatar atualizado com sucesso!",
      avatarUrl
   })  
}


export const uploadCover = async (req: ExtendedRequest, res: Response) => {
    const file = req.file

   if(!file) {
      res.status(500).json({ error: "Error ao fazer o upload da foto!"})
      return
   }

   const user = await findUserByUserName(req.username as string)
   const avatarUrl = getPublicURL(file.filename)
   await updateAvatar(user?.username as string, avatarUrl)
   
   res.status(200).json({
      message: "Cover atualizado com sucesso!",
      avatarUrl
   })  
}