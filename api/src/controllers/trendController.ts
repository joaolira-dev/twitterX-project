import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getTrendings } from "../services/trend";

export const getTrending = async (req: ExtendedRequest, res: Response) => {
   const trends = await getTrendings()
   


   res.json({ trends })
}