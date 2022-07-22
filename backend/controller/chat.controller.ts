import { Request, Response } from "express";
import chatModel from "../models/chat.model";
import userModel from "../models/user.model";

export const accessChat = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("User id param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        // @ts-ignore
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");
  // @ts-ignore
  isChat = await userModel.populate(isChat, {
    path: "latestMessae.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      // @ts-ignore
      users: [req.user._id, userId],
    };
  }

  try {
    // @ts-ignore
    const createdChat = await chatModel.create(chatData);

    const FullChat = await chatModel
      .findOne({ _id: createdChat._id })
      .populate("users", "-password");

    res.status(200).send(FullChat);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

export const fetchChats = async (req: Request, res: Response) => {
  try {
    const chats = await chatModel
      .find({
        // @ts-ignore
        users: { $elemMatch: { $eq: req.user._id } },
      })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        // @ts-ignore
        result = await userModel.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.send(result);
      });
  } catch (error) {
    throw error;
  }
};

export const createGroupChat = async (req: Request, res: Response) => {
  let { users, name } = req.body;
  // @ts-ignore
  const user = req.user;

  if (!users || !name) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  users = JSON.parse(users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  console.log(user);
  users.push(user);
  console.log(users);
  try {
    const groupChat = await chatModel.create({
      chatName: name,
      users,
      isGroupChat: true,
      groupAdmin: user,
    });

    const fullGroupChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    throw error;
  }
};

export const renameGroup = async (req: Request, res: Response) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await chatModel
    .findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400).send({ message: "chat not found" });
  } else {
    res.json(updatedChat);
  }
};

export const addToGroup = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  const added = await chatModel
    .findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};

export const removeFromGroup = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  const added = await chatModel
    .findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};
