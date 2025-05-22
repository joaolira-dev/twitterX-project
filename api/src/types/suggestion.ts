import { Prisma } from "../generated/prisma";

export type Suggestion = Pick<Prisma.UserGetPayload<Prisma.UserDefaultArgs>, "name" | "avatar" | "username">