import { NextResponse, NextRequest } from "next/server";
import User from "@/model/User";


export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('authorization')

        const users = await User.findOne({
            attributes: [
                'userId',
                'nameOfUser',
                'emailOfUser',
                'phoneNumber'
            ],
            where: { userId: userId }
        });
       
        return NextResponse.json({
            status: 200,
            users
        })

    } catch (error) {
        console.log("Error occurred at getting single user Route : ", error)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error !!!"
        })
    }
}