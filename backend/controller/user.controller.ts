import { Request, Response } from "express";
import { IUser } from "../types/user.type";
import userModel from "../models/user.model";
import generateToken from "../config/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, pic } = req.body as Pick<
    IUser,
    "name" | "email" | "password" | "pic"
  >;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await userModel.create({
    name,
    email,
    password,
    pic,
  });

  if (newUser) {
    await newUser.save();
    res.json({ data: newUser, token: generateToken(newUser?._id) });
  } else {
    res.status(400);
    throw new Error("failed to create user");
  }
};

export const authUser = async(req: Request, res: Response) => {
  const {email, password} = req.body;

  const user = await userModel.findOne ({email});

  if (user && (await userModel.matchPassword(password))) {
    res.json({data: user});
  }
}