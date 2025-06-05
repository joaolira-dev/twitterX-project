import { Prisma } from "../generated/prisma";
import { prisma } from "../helpers/prisma";
import { avatarURL, coverURL, getPublicURL } from "../helpers/url";
import { Suggestion } from "../types/suggestion";

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
      avatar: avatarURL(user.avatar),
      cover: coverURL(user.cover)
    }
  }

  return null;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  const newUser = await prisma.user.create({ data });
  return {
    ...newUser,
    avatar: avatarURL(newUser.avatar),
    cover: coverURL(newUser.cover),
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
    return "Voce nao pode seguir a si mesmo!";
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

export const updateUserInfo = async (
  username: string,
  data: Prisma.UserUpdateInput
) => {
  await prisma.user.update({
    where: { username },
    data,
  });
};

export const userFollowing = async (username: string) => {
  const following = [];
  const reqFollowing = await prisma.follow.findMany({
    select: {
      followingId: true,
    },
    where: { followerId: username },
  });
  for (let reqItem of reqFollowing) {
    following.push(reqItem.followingId);
  }

  return following;
};

export const userSuggestions = async (username: string) => {
  const following = await userFollowing(username);
  const followingWithMe = [...following, username];

  const suggestions: Suggestion[] = await prisma.$queryRaw`
    SELECT
      name, avatar, username
    FROM "User"
    WHERE
      username NOT IN (${followingWithMe.join(",")})
    ORDER BY RANDOM()
    LIMIT 2;
  `;
  for (let sugIndex in suggestions) {
    suggestions[sugIndex].avatar = getPublicURL(suggestions[sugIndex].avatar);
  }
  return suggestions;
};
