import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import userModel from "../models/user.model";
require("dotenv").config();

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // @ts-ignore
      token = await req.headers.authorization?.split(" ")[1];
      // decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // @ts-ignore
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
