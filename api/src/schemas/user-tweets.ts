import { z } from "zod"

export const userTweetSchema = z.object({
   page: z.coerce.string().min(0).optional()
})
