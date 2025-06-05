import { prisma } from "../helpers/prisma";

export const updateAvatar = async (username: string, avatar: string) => {
  const user = await prisma.user.update({
    where: { username },
    data: { avatar },
  });

  return user;
};

export const updateCover = async (username: string, cover: string) => {
  const user = await prisma.user.update({
    where: { username },
    data: { cover },
  });
};
