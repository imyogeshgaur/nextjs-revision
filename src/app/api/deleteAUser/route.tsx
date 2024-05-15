import { NextResponse, NextRequest } from "next/server";
import User from "@/model/User";

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.headers.get("authorization");

    const userToDelete: any = await User.destroy({
      where: { userId },
    });

    if (userToDelete[0]) {
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
    console.log("Error occurred at getting all users Route : ", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !!!",
    });
  }
}
