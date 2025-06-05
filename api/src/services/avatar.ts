import { prisma } from "../helpers/prisma";

export const updateAvatar = async (username: string, avatarUrl: string) => {
  const user = await prisma.user.update({
    where: { username },
    data: { avatar: avatarUrl }
   })

  return user
};