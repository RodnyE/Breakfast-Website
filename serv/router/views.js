const config = require("../../config.js");
const {User} = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");

const views = async (req, res) => {
    if (!req.body) return res.json({ status: false, data: { message: "NO_DATA" } });
    let fp;
    try {
        const body = req.body;
        fp = body.fp;
    } catch (err) {
        return res.json({
            status: false,
            data: {
                message: "DATA_ERROR",
                error: err
            }
        });
    }
    const already = await User.findOne({
        where: {
            user_ip: fp
        }
    });
    if (!already) {
        const user = await User.create({
            user_ip: fp,
            name: "user_" + uid.num(4)
        });
    }

    const v = (await User.findAll()).length + 2979;

    return res.json({views: v})
    
};

module.exports = views;