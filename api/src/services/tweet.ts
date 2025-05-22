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

export const findTweetsByUser = async (username: string, currentPage: number, perPage:number) => {
   const tweets = await prisma.tweet.findMany({
      include: {
         likes: {
            select: {
               userLike: true
            }
         }
      },
      where: { userTweet: username, answerOf: 0 },
      orderBy: { createdAt: "desc" },
      skip: currentPage * perPage,
      take: perPage
   })
   if(tweets) {
      return tweets
   }
}

export const checkUserLiked = async (username: string, id: number) => {
   const isLiked = await prisma.tweetLike.findFirst({
      where: {
         userLike: username,
         tweetId: id
      }
   })

   return isLiked ? true : false
}

export const unlikeTweet = async (username: string, id: number) => {
   await prisma.tweetLike.deleteMany({
      where: {
         userLike: username,
         tweetId: id
      }
   })
}

export const likeTweet = async (username: string, id: number) => {
   await prisma.tweetLike.create({
      data: {
         userLike: username,
         tweetId: id
      }
   })
}

export const findTweetsFeed = async (following: string[], perPage: number, currentPage: number) => {
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
      where: {
         userTweet: { in: following },
         answerOf: 0
      },
      orderBy: { createdAt: "desc" },
      skip: currentPage * perPage,
      take: perPage
   })

   for(let tweetIndex in tweets) {
      tweets[tweetIndex].user.avatar = getPublicURL(tweets[tweetIndex].user.avatar)
   }
   return tweets
}