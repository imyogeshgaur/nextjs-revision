import { NextResponse, NextRequest } from "next/server";
import User from "@/model/User";
import validateAndDecodeToken from "@/utils/validateToken";

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('authorization')
        const { message, flag } = validateAndDecodeToken(token);
        if (flag) {
            const users = await User.findAll();
            return NextResponse.json({
                status: 200,
                users
            })
        } else {
            return NextResponse.json({
                status: 401,
                message
            })
        }
    } catch (error) {
        console.log("Error occurred at getting all users Route : ", error)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error !!!"
        })
    }
}