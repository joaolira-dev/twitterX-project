import { Prisma } from "../generated/prisma";
import { prisma } from "../helpers/prisma";
import { getPublicURL } from "../helpers/url";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return {
      ...user,
      avatar: getPublicURL(user.avatar),
      cover: getPublicURL(user.cover),
    };
  }

  return null;
};

export const findUserByUserName = async (username: string) => {
  const user = await prisma.user.findFirst({
    select: {
      avatar: true,
      cover: true,
      username: true,
      name: true,
      bio: true,
      link: true,
    },
    where: { username },
  });

  if (user) {
    return {
      ...user,
      avatar: getPublicURL(user.avatar),
      cover: getPublicURL(user.cover),
    };
  }

  return null;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  const newUser = await prisma.user.create({ data });
  return {
    ...newUser,
    avatar: getPublicURL(newUser.avatar),
    cover: getPublicURL(newUser.cover),
  };
};

export const countUserFollowing = async (username: string) => {
  const count = await prisma.follow.count({
    where: { followerId: username },
  });
  return count;
};

export const countUserFollowers = async (username: string) => {
  const count = await prisma.follow.count({
    where: { followingId: username },
  });
  return count;
};

export const countUserTweets = async (username: string) => {
  const count = await prisma.tweet.count({
    where: { userTweet: username },
  });
  return count;
};

export const checkFollow = async (followerId: string, followingId: string) => {
  const follows = await prisma.follow.findFirst({
    where: { followerId, followingId },
  });
  return follows ? true : false;
};

export const followUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    return "Voce nao pode seguir a si mesmo!"
  } else {
    const follows = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
    return "Seguido!";
  }
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  const unfollow = await prisma.follow.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });
  return unfollow;
};


export const updateUserInfo = async (username: string, data: Prisma.UserUpdateInput) => {
  await prisma.user.update({
    where: { username },
    data
  })
}

export const userFollowing = async (username: string) => {
  const following = []
  const reqFollowing = await prisma.follow.findMany({
    select: {
      followingId: true
    },
    where: { followerId: username },
  });
  for(let reqItem of reqFollowing) {
    following.push(reqItem.followingId)
  }

  return following
};