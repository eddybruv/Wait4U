import { IUser } from "../types/user.type";
import { Schema, model } from "mongoose";
import { NextFunction } from "express";
const bcrypt = require("bcrypt");

const UserSchema: Schema = new Schema(
  {
    name: { type: "String", required: true, trim: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async (enteredPassword: string) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async (next: NextFunction) => {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hast(this.password, salt);
});

export default model<IUser>("user", UserSchema);
