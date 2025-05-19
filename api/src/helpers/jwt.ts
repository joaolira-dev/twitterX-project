import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { findUserByUserName } from "../services/user"
import { ExtendedRequest } from "../types/extended-request"

export const createJWT = (username: string) => {
   return jwt.sign({ username }, process.env.JWT_SECRET_KEY as string)
}

export const verifyJWT = (token: string): string | false => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as any;
    return decoded.username;
  } catch (error) {
    return false;
  }
};