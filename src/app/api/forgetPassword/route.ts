import User from "@/model/User";
import { forgetPasswordMailFunction } from "@/utils/sendMail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { emailOfUser } = await req.json();
    const isEmailExist = await User.findOne({ where: { emailOfUser } })
    if (isEmailExist) {
      const { messageToSend, responseToSend }: any = await forgetPasswordMailFunction(emailOfUser);
      return NextResponse.json({
        status: responseToSend,
        message: messageToSend
      })
    } else {
      return NextResponse.json({
        status: 401,
        message: "Invalid Email !!!"
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