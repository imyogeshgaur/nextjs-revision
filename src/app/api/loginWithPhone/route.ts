import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import User from "@/model/User";
import { resolve } from "path"
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
config({ path: resolve("./src/.env") })

export async function POST(req: NextRequest) {
    try {
        const { emailOrPhone, password } = await req.json();
        const isUserExist: any = await User.findOne({ where: { phoneNumber: emailOrPhone } })
        if (isUserExist) {
            const match: any = compare(password, isUserExist.password);
            if (match) {
                const token = sign({ userId: isUserExist.userId }, process.env.JWT_SECRET as string);
                return NextResponse.json({
                    status: 200,
                    message:token
                })
            } else {
                return NextResponse.json({
                    status: 401,
                    message: "Invalid Credentials !!!"
                })
            }
        } else {
            return NextResponse.json({
                status: 401,
                message: "Invalid Credentials !!!"
            })
        }

    } catch (error) {
        console.log("Error occurred at login with phone Route : ", error)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error !!!"
        })
    }
}