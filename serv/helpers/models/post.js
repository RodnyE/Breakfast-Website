const PostModel = (DataTypes) => {
    return {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull:  false
        }
    };
};

module.exports = PostModel;