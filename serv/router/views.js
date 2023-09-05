const config = require("../../config.js");
const {User} = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");

const views = async (req, res) => {
    const ip = req.socket.remoteAddress;
    const already = await User.findOne({
        where: {
            user_ip: ip
        }
    });
    if (!already) {
        const user = await User.create({
            user_ip: ip,
            name: "user_" + uid.num(4)
        });
    }

    const v = (await User.findAll()).length;

    return res.json({views: v})
    
};

module.exports = views;