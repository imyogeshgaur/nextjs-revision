import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import User from "@/model/User";
import {v1} from "uuid"

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const userId = v1();
        const newPassword = await hash(data.password, 12);
        const newUser = await User.create({
            userId,
            ...data,
            password:newPassword
        })
        return NextResponse.json({
            status:200,
            message:"User Created Successfully !!!",
            data:newUser
        })
    } catch (error) {
        console.log("Error occurred at Register Route : ", error)
        return NextResponse.json({
            status:500,
            message: "Internal Server Error !!!"
        })
    }
}