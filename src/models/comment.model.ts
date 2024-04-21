import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IComment{
    text: string;
    user_id: Schema.Types.ObjectId;
    article_id: Schema.Types.ObjectId;
}

const CommentSchema = new Schema<IComment>({
    text: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
        
    },
    article_id: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

export const Comment = model<IComment>('Comment', CommentSchema);