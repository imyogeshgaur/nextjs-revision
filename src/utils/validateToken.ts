import { verify, decode } from "jsonwebtoken";
import { resolve } from "path"
import { config } from "dotenv";
config({ path: resolve("./src/.env") })

const validateAndDecodeToken = (token: any) => {
    const verifyTheToken = verify(token, process.env.JWT_SECRET as string);
    if (verifyTheToken) {
        return {message:"Authorized !!!",flag:1}
    } else {
        return { message: "Not Authorized !!!",flag:0 }
    }
}

export default validateAndDecodeToken