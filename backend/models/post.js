const User = require("./user");
const { sq } = require("../config/db"); //import the sequelize instance

const { DataTypes } = require("sequelize"); //import DataTypes from sequelize

const Post = sq.define("Post", {
    
    title: {
        type: DataTypes.STRING,
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    multimediaUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

User.hasMany(Post, { foreignKey: "userId" });


module.exports = Post;