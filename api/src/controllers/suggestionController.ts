import { Response } from "express"
import { ExtendedRequest } from "../types/extended-request"
import { userSuggestions } from "../services/user"

export const getSuggestion = async (req: ExtendedRequest, res: Response) => {
   const suggestions = await userSuggestions(req.username as string)

   res.json({ users: suggestions })
}