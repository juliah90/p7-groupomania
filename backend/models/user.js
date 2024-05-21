const { sq } = require("../config/db"); //import the sequelize instance

const { DataTypes } = require("sequelize"); //import DataTypes from sequelize

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
}); //creates the database table for the User model if it doesn't exist and does nothing if it exists

module.exports = User;