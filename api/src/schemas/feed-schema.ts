import { z } from "zod"

export const getFeedSchema = z.object({
   page: z.coerce.number().min(0).optional()
})
