import {IMessage} from "../types/message.type"
import {Schema, model} from "mongoose";

const MessageSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "user" },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "chat"},
  },
  {
    timestamps: true,
  }
);

export default model<IMessage>("message", MessageSchema);