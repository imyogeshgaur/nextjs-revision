import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    try {
        const { emailOfUser, password }: any = req.body;
        const isUserExist = await User.findOne({ where: { emailOfUser } })
        if (isUserExist) {
            const update = await User.update(
                { password },
                {
                    where: { emailOfUser }
                })
            if (update[0] == 1) {
                return { message: "Password Reset Successfully !!!", status: 200 }
            } else {
                return { message: "Password Reset Failed !!!", status: 400 }
            }
        } else {
            return NextResponse.json({
                status: 401,
                message: "User Not Exist !!!"
            })
        }
    } catch (error) {
        console.log("Error occurred at forget password Route : ", error)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error !!!"
        })
    }
}