import { Response } from "express";
import { countUserTweets, findUserByUserName, userFollowers, userFollowing } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";
import { userTweetSchema } from "../schemas/user-tweets";
import { findTweetsByUser } from "../services/tweet";

export const getUser = async (req: ExtendedRequest, res: Response) => {
   const { slug } = req.params


   const user = await findUserByUserName(slug)
   if(!user) {
      res.json({ error: "Usuário inexistente "})
      return
   }

   const followers = await userFollowers(user.username)
   const following = await userFollowing(user.username)
   const tweets = await countUserTweets(user.username)
   console.log(tweets)
   console.log(user.username)


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