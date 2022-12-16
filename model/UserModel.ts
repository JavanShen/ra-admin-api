import { Schema, model } from "mongoose";
import type { User } from "../types/user";

const userSchema = new Schema<User>({
    username: String,
    password: String,
    role: String
})

const UserModel = model<User>('User', userSchema)

export default UserModel