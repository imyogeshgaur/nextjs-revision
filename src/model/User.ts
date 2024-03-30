import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db.config";

const User = sequelize.define('User', {
    userId:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    nameOfUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailOfUser: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

User.sync({ alter: true });

export default User;



