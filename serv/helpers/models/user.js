const UserModel = (DataTypes) => {
    return {
        user_ip: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
};

module.exports = UserModel;