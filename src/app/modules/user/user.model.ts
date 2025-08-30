import { model, Schema } from "mongoose";
import { IsActive, IUser, Role } from "./user.interface";

const AuthSchema = new Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    _id: false,
    versionKey: false
});

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    isVerified: { type: Boolean, default: false },
    auths: [AuthSchema]
}, {
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>("User", UserSchema);