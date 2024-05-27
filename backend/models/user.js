const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aboutMe: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

User.sync({ alter: true }).then(() => {
    console.log("User Model synced");
});

module.exports = User;
