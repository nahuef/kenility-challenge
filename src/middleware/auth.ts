import config from "config";
import { Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import Request from "../types/Request";

export default function(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  }
  try {
    jwt.verify(token, config.get("jwtSecret"));
    next();
  } catch (err) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
}
