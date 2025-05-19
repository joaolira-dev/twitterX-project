import { z } from "zod"

export const postTweetSchema = z.object({
   body: z.string({message: "Corpo é obrigatório"}),
   answer: z.string().optional(),
})
