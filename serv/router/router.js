const router = require("express").Router();
const views = require("./views.js");
const {post , getPost} = require("./post.js");

router.get("/views" , views);
router.post("/getpost" , getPost);
router.post("/post" , post);

module.exports = router;