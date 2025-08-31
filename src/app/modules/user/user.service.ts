import AppError from "../../errorHelpers/AppError";
import { IAuth, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
    const {email, password, ...rest } = payload;

    const ifUserExists = await User.findOne({email})

    if(ifUserExists){
        throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password as string, 10)

    const authProvider : IAuth = {provider: "credentials", providerId: email as string}

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    });
    return user;
}

const getAllUsers = async() => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();

    return {
        data : users,
        meta : {
           total : totalUsers
        }
    }
}

export const UserServices = {
    createUser,
    getAllUsers
}