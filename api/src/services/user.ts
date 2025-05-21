import { Prisma } from '../generated/prisma'
import { prisma } from "../helpers/prisma"
import { getPublicURL } from "../helpers/url"

export const findUserByEmail = async (email: string) => {
   const user = await prisma.user.findFirst({
      where: { email }
   })

   if(user) {
      return {
         ...user, 
         avatar: getPublicURL(user.avatar),
         cover: getPublicURL(user.cover)
      }
   }

   return null
}

export const findUserByUserName = async (username: string) => {
   const user = await prisma.user.findFirst({
      select: {
         avatar: true,
         cover: true,
         username: true,
         name: true,
         bio: true,
         link: true
      },
      where: {username}
   })

     if(user) {
      return {
         ...user, 
         avatar: getPublicURL(user.avatar),
         cover: getPublicURL(user.cover)
      }
   }

   return null
}

export const createUser = async (data: Prisma.UserCreateInput) => {
   const newUser = await prisma.user.create({ data })
   return {
      ...newUser,
      avatar: getPublicURL(newUser.avatar),
      cover: getPublicURL(newUser.cover)
   }
}

export const userFollowing = async (username: string) => {
   const count = await prisma.follow.count({
      where: { followerId: username }
   })
   return count
}

export const userFollowers = async (username: string) => {
   const count = await prisma.follow.count({
      where: { followingId: username }
   })
   return count
}


export const countUserTweets = async (username: string) => {
   const count = await prisma.tweet.count({
      where: { userTweet: username }
   })
   return count
}


