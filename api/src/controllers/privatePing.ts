import { RequestHandler } from "express";

export const privatePing: RequestHandler = (req,res) => {
   res.json({ pong : true})
}