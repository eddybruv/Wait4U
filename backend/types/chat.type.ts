import { Document, Schema} from "mongoose";

export interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: Schema.Types.ObjectId[];
  latestMessage: Schema.Types.ObjectId;
  groupAdmin: Schema.Types.ObjectId;
}