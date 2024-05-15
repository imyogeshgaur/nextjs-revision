import { NextResponse, NextRequest } from "next/server";
import User from "@/model/User";

export async function PUT(req: NextRequest) {
  try {
    const userId = req.headers.get("authorization");
    const { nameOfUser, emailOfUser, phoneNumber }: any = await req.json();

    const updateUser = await User.update(
      {
        nameOfUser,
        emailOfUser,
        phoneNumber,
      },
      {
        where: { userId },
      }
    );
    if (updateUser[0]) {
      return NextResponse.json({
        status: 200,
        message: "User updated successfully !!!",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "User not updated successfully !!!",
      });
    }
  } catch (error) {
    console.log("Error occurred at edit a single user Route : ", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !!!",
    });
  }
}
