const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync({ alter: true }).then(() => {
    console.log("User Model synced");
});

module.exports = User;
