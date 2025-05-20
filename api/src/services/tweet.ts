import { prisma } from "../helpers/prisma"
import { getPublicURL } from "../helpers/url"

export const findTweet = async (id: number) => {
   const tweet = await prisma.tweet.findFirst({
      include: {
         user: {
            select: {
               name: true,
               avatar: true,
               username: true
            }
         },
         likes: {
            select: {
               userLike: true
            }
         }
      },
      where: { id }
   })
   if(tweet) {
      tweet.user.avatar = getPublicURL(tweet.user.avatar)
      return tweet       
   }
   if(!tweet) {
      return null
   }
}

export const createTweet = async (username: string, body: string, answer?: number) => {
   const newTweet = await prisma.tweet.create({
      data: {
         body,
         userTweet: username,
         answerOf: answer ? answer : 0
      }
   })


   return newTweet
}

export const findAnswersFromTweet = async (id: number) => {
   const tweets = await prisma.tweet.findMany({
       include: {
         user: {
            select: {
               name: true,
               avatar: true,
               username: true
            }
         },
         likes: {
            select: {
               userLike: true
            }
         }
      },
      where: { answerOf: id }
   })
   for(let tweet in tweets) {
      tweets[tweet].user.avatar = getPublicURL(tweets[tweet].user.avatar)
   }
   return tweets
}