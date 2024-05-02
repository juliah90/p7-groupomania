const { User } = require("./user");
const { sq } = require("../config/db"); //import the sequelize instance

const { DataTypes } = require("sequelize"); //import DataTypes from sequelize

const Post = sq.define("Post", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },

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
    }
});

User.hasMany(Post, { foreignKey: "userId" });

Post.sync({ alter: true }).then(() => {
    console.log("Post Model synced");
}); //creates the database table for the post model if it doesn't exist and does nothing if it exists

module.exports = Post;