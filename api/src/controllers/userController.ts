import { Response } from "express";
import { findUserByUserName, userFollowers, userFollowing, userTweets } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";

export const getUser = async (req: ExtendedRequest, res: Response) => {
   const { username } = req.params


   const user = await findUserByUserName(username)
   if(!user) {
      res.json({ error: "Usuário inexistente "})
      return
   }

   const followers = await userFollowers(user.username)
   const following = await userFollowing(user.username)
   const tweets = await userTweets(user.username)
   console.log(tweets)
   console.log(user.username)


   res.json({ user, followers, following, tweets })
}

export const getUserTweets = async (req: ExtendedRequest, res: Response) => {
   
}