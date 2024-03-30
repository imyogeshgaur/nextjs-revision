import { Sequelize } from "sequelize";
import { resolve } from "path"
import { config } from "dotenv";
config({ path: resolve("./src/.env") })

export const sequelize = new Sequelize({
    host:process.env.DB_HOST as string,
    username:process.env.DB_USERNAME as string,
    password:process.env.DB_PASSWORD as string,
    database:process.env.DB_NAME as string,
    dialect:'mysql',
    dialectModule:require('mysql2'),
    benchmark:true
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected !!!");
    } catch (error) {
        console.log("Some error occurred at db conn: ", error);
    }
}

export default connectDb;