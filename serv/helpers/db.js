const config = require("../../config.js");
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const UserModel = require("./models/user.js");
const PostModel = require("./models/post.js");

/**********************
 * Starting Connection *
 **********************/
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DB + '/db.sqlite'
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (err) {
        throw new Error("" + err)
    }
})();

/*********************
 *   User Model DB   *
 *********************/
class User extends Model {
    getData() {
        const rows = [ "user_ip", "name"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}
 User.init(
 UserModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await User.sync();
})();

/*********************
 *   Post Model DB   *
 *********************/
class Post extends Model {
    getData() {
        const rows = [ "name", "text"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}
 Post.init(
 PostModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await Post.sync();
})();

module.exports = {User , Post};