import { Schema, model } from "mongoose";
import { roles } from "../utils";

interface IFaculty {
    name: string;
    marketing_coordinator_id: Schema.Types.ObjectId;
}

const FacultySchema = new Schema<IFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    marketing_coordinator_id: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Tham chiếu tới mô hình Parent
    }
}, {
    timestamps: true,
});

export const Faculty = model<IFaculty>('Faculty', FacultySchema);