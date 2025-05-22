import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { searchSchema } from "../schemas/search-schema";

export const searchTweets = async (req: ExtendedRequest, res: Response) => {
  const safeData = searchSchema.safeParse(req.query)
     if(!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return
     }
     let currentPage = safeData.data.page ?? 0
     let perPage = 2

   res.json({ })
}