const express = require("express");
const { User, Study } = require("../models");
const path = require('path');
const router = express.Router();
/*
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map((f) => f.id)
    : [];
  next();
});
*/
/*
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "content", "visibility"],
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });

    const comments = await Comment.findAll({
      attributes: ["contents", "UserId", "postId", "whoWrite"],
    });
    console.log("comments 확인");
    console.log(comments);

    res.render("main", {
      title: "prj-name",
      twits: posts,
      comments: comments,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
*/
/*
router.get("/", (req, res) => {
  res.sendFile("../public/index.html");
  //console.log("엥?");
});
*/


router.get("*", (req,res)=>{
	console.log("여기까지옴1234");
	try{
		res.sendFile(path.join(__dirname , "../public/index.html"));	
	}catch (e){
		console.log(`sendfile Error ${e}`);
	}
	
	return;
})

module.exports = router;
