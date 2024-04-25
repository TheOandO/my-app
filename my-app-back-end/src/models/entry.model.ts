import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IEntry {
    name: string;
    dateline1: Date;
    dateline2: Date;
    faculty_id: Schema.Types.ObjectId;
    
}

const IEntrySchema = new Schema<IEntry>({
    name: {
        type: String,
        required: true,
    },
    dateline1: {
        type: Date,
        required: true,
    },
    dateline2: {
        type: Date,
        required: true,
    },
    faculty_id: {
       type: Schema.Types.ObjectId,
       ref: 'Faculty',
       required: true,
       trim: true,
    }
   
}, {
    timestamps: true,
});

export const Entry = model<IEntry>('Entry', IEntrySchema);