import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserServices.createUser(req.body);
        res.status(httpStatus.CREATED).json({
            message: "User created successfully",
            data: user
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong: ${error.message}`,
            error: error.message,
        });
    }
}

export const UserController = {
    createUser
}