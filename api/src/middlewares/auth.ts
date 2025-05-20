import { Response, NextFunction } from "express";
import { verifyJWT } from "../helpers/jwt";
import { findUserByUserName } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";

export const privateRoute = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  let token = ""
  req.body !== undefined ? token = req.body : token = req.headers["authorization"] as string



  if (!token || token === "") {
    res.status(401).json({ notallowed: true });
    return;
  }

  const username = verifyJWT(token)
  


  if (!username || typeof username !== "string") {
    res.status(401).json({ notallowed: true });
    return;
  }

  const user = await findUserByUserName(username);
  if (!user) {
    res.status(401).json({ notallowed: true });
    return;
  }

  req.username = user.username;

  next(); 
};
