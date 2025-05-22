import { Response } from "express";
import { checkFollow, countUserFollowers, countUserFollowing, countUserTweets, findUserByUserName, followUser, unfollowUser, updateUserInfo } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";
import { userTweetSchema } from "../schemas/user-tweets";
import { findTweetsByUser } from "../services/tweet";
import { editUserSchema } from "../schemas/edit-user";

export const getUser = async (req: ExtendedRequest, res: Response) => {
   const { slug } = req.params


   const user = await findUserByUserName(slug)
   if(!user) {
      res.json({ error: "Usuário inexistente "})
      return
   }

   const followers = await countUserFollowers(user.username)
   const following = await countUserFollowing(user.username)
   const tweets = await countUserTweets(user.username)
   


   res.json({ user, followers, following, tweets })
}

export const getUserTweets = async (req: ExtendedRequest, res: Response) => {
   const { slug } = req.params
   
   const safeData = userTweetSchema.safeParse(req.query)
   if(!safeData.success) {
     res.json({ error: safeData.error.flatten().fieldErrors })
     return
   }

   let perPage = 2
   let currentPage = safeData.data.page ?? 0

   const tweets = await findTweetsByUser(slug, currentPage as number, perPage)
   if(!tweets) {
      res.json({ error: "Esse usuário não postou tweets" })
      return
   }

   res.json({ tweets, page: currentPage })
}

export const followToggle = async (req: ExtendedRequest, res: Response) => {
   const { slug } = req.params
   const loggedUser = req.username as string


   const hasUserToFollow = await findUserByUserName(slug)
   if(!hasUserToFollow) {
      res.json({ error: "Usuário inexistente" })
      return
   }


   const check = await checkFollow(loggedUser, slug)
   if(!check) {
      const follow = await followUser(loggedUser, slug)
      res.json({ follow })
      return
   } else {
      await unfollowUser(loggedUser, slug)
      res.json({ following: false })
      return
   }

}

export const editUser = async (req: ExtendedRequest, res: Response) => {
   const safeData = editUserSchema.safeParse(req.body)
   if(!safeData.success) {
      res.json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   await updateUserInfo(req.username as string, safeData.data)


   res.json({ })
}