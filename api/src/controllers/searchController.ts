import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { searchSchema } from "../schemas/search-schema";
import { findTweetsByBody } from "../services/tweet";

export const searchTweets = async (req: ExtendedRequest, res: Response) => {
  const safeData = searchSchema.safeParse(req.query)
     if(!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return
     }
     let currentPage = safeData.data.page ?? 0
     let perPage = 2


   const tweets = await findTweetsByBody(safeData.data.q, perPage, currentPage)
   console.log(tweets)
   res.json({ tweets, page: currentPage })
}