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


module.exports = User;
