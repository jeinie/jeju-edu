const express = require("express");
//const passport = require("passport");
//const bcrypt = require("bcrypt");
//const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/join", async (req, res, next) => {
  const { id, password, name } = req.body;
  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      res.send("유저 중복");
    }

    await User.create({
      id,
      password,
      name,
    });
    console.log(`회원가입 정보\nid : ${id}\npw : ${password}\nname : ${name}`);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { id, password } = req.body;
  try {
    const exUser = await User.findOne({
      where: { id: id, password: password },
    });

    req.session.userInfo = exUser.dataValues;

    console.log(`로그인 확인 ${JSON.stringify(req.session.userInfo)}`);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  //res.redirect("/");
  console.log(`로그아웃 확인${req}`);
});

module.exports = router;
