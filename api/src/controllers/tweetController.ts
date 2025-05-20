import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { postTweetSchema } from "../schemas/post-schema";
import { createTweet, findTweet } from "../services/tweet";
import { addHashtag } from "../services/trend";

export const postTweet = async (req: ExtendedRequest, res: Response) => {
  const safeData = postTweetSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }
  if(safeData.data.answer) {
   const hasAnswerTweet = await findTweet(parseInt(safeData.data.answer))
   if(!hasAnswerTweet) {
      res.json({ error: "Tweet original inexistente! "})
      return
   }
  }
 
  const newTweet = await createTweet(
   req.username as string,
   safeData.data.body,
   safeData.data.answer ? parseInt(safeData.data.answer) : 0
  )
  
  const hashtags = safeData.data.body.match(/#[a-zA-Z0-9_]+/g)
  if(hashtags) {
    for(let hashtag of hashtags) {
      if(hashtags.length >= 2) {
        await addHashtag(hashtag)
      }
    }
  }


  res.json({ tweet: newTweet });
};

export const getTweet = async (req: ExtendedRequest, res: Response) => {
  
}