import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IComment {
  text: string;
}

const CommentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = model<IComment>("Comment", CommentSchema);
