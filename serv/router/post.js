const config = require("../../config.js");
const { User , Post } = require(config.SERV + "/helpers/db.js");


const getPost = async (req, res) => {
    if (!req.body) return res.json({ status: false, data: { message: "NO_DATA" } });
    let sel;
    try {
        const body = req.body;
        sel = body.sel;
    } catch (err) {
        return res.json({
            status: false,
            data: {
                message: "DATA_ERROR",
                error: err
            }
        });
    }

    const posts = await Post.findAll({
        order: [['createdAt', 'DESC']]
    });

    let p = [];

    for(let s = (sel - 1); s < (sel + 8) ; s++){
        if(!posts[s]) break;
        p[s] = posts[s];
    }

    return res.json({status: true, data: p});
};

const post = async (req, res) => {
    if (!req.body) return res.json({ status: false, data: { message: "NO_DATA" } });
    let text, name;
    try {
        const body = req.body;
        text = body.text;
        name = body.name;
    } catch (err) {
        return res.json({
            status: false,
            data: {
                message: "DATA_ERROR",
                error: err
            }
        });
    }
    const ip = req.socket.remoteAddress;
    let user = await User.findOne({
        where: {
            user_ip: ip
        }
    });

    if(user && name){
        await user.setData({name :  name});
    }

    user = await User.findOne({
        where: {
            user_ip: ip
        }
    });

    const po = await Post.create({
        name: (user ? user.name : "Anonimo"),
        text: text
    });

    if(!po) return res.json({status: false , data : {message : "ERROR_DB"}});

    return res.json({status: true, data: {message: "SUCCESS"}});
};

module.exports = {post, getPost}
