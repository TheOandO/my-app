import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface ISchoolYear {
    name: string;
    start_time: Date;
    end_time: Date;
    
}

const SchoolYearSchema = new Schema<ISchoolYear>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    }
   
}, {
    timestamps: true,
});

export const SchoolYear = model<ISchoolYear>('SchoolYear', SchoolYearSchema);