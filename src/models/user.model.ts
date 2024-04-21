import { Schema, model } from 'mongoose';
import { roles } from '../utils';

interface IUser {
    username: string;
    password: string;
    email: string;
    role: string;
    words: Array<any>;
    name: string;
    faculty_id: Schema.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    faculty_id: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(roles),
        
    },
}, {
    timestamps: true,
});

export const User = model<IUser>('User', UserSchema);
