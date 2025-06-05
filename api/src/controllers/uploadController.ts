import e, { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { findUserByUserName } from "../services/user";
import { avatarURL, coverURL } from "../helpers/url";
import { updateAvatar, updateCover } from "../services/upload";

export const uploadAvatar = async (req: ExtendedRequest, res: Response) => {
   const file = req.file

   if(!file) {
      res.status(500).json({ error: "Error ao fazer o upload da foto!"})
      return
   }

   const user = await findUserByUserName(req.username as string)
   const avatarName = file.filename
   const avatarUrl = avatarURL(avatarName)
   await updateAvatar(user?.username as string, avatarName)
   
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
   const coverName = file.filename
   const coverUrl = coverURL(coverName)
   await updateCover(user?.username as string, coverName)
   
   res.status(200).json({
      message: "Cover atualizado com sucesso!",
      coverUrl
   })  
}