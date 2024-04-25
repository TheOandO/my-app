import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IArticle {
    text: string;
    files: Array<string>;
    images: Array<string>;
    entry_id: Schema.Types.ObjectId;
    student_id: Schema.Types.ObjectId;
    faculty_id: Schema.Types.ObjectId;
    school_year_id: Schema.Types.ObjectId;
    term_condition: boolean;
}

const ArticleSchema = new Schema<IArticle>({
    text: {
        type: String,
        required: false,
    },
    files: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
    },
    entry_id: {
        type: Schema.Types.ObjectId,
        ref: 'Entry',
        required: true,
        trim: true,
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    },
    // faculty_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Faculty',
    //     required: true,
    //     trim: true,
    // },
    school_year_id: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolYear',
        required: true,
        trim: true,
    },
    term_condition: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
});

export const Article = model<IArticle>('Article', ArticleSchema);