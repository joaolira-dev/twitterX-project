import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getFeedSchema } from "../schemas/feed-schema";
import { userFollowing } from "../services/user";
import { findTweetsFeed } from "../services/tweet";

export const getFeed = async (req: ExtendedRequest, res: Response) => {
   const safeData = getFeedSchema.safeParse(req.query)
   if(!safeData.success) {
      res.json({ error: safeData.error.flatten().fieldErrors })
      return
   }
   let currentPage = safeData.data.page ?? 0
   let perPage = 2

   const following = await userFollowing(req.username as string)
   const tweets = await findTweetsFeed(following, perPage, currentPage)

   res.json({ tweets, page: currentPage })
}