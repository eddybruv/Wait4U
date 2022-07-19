import { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  content: string;
  chat: Schema.Types.ObjectId;
}