const express = require("express");
//const passport = require("passport");
//const bcrypt = require("bcrypt");
//const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const Study = require("../models/study");
const router = express.Router();

router.post("/api/join", async (req, res, next) => {
  const result = {};
  const { id, password, name } = req.body;
  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      result["success"] = 100;
      result["msg"] = "아이디 중복입니다";
      res.json(result);
      return;
    }
    await User.create({
      id,
      password,
      name,
    });
    console.log(`회원가입 정보\nid : ${id}\npw : ${password}\nname : ${name}`);
    result["success"] = 200;
    result["msg"] = "회원가입 성공";
    res.json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/api/login", async (req, res, next) => {
  const { id, password } = req.body;
  const result = {};
  try {
    const exUser = await User.findOne({
      where: { id: id, password: password },
    });
    if (exUser) {
      req.session.userInfo = exUser.dataValues;
      result["success"] = 200;
      result["msg"] = "로그인 성공";
      result["userInfo"] = req.session.userInfo;
      //console.log(`로그인 확인 ${JSON.stringify(req.session.userInfo)}`);
      res.json(result);
    } else {
      result["success"] = 100;
      result["msg"] = "로그인 실패";
      res.json(result);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/logout", (req, res) => {
  const result = {};
  result["success"] = 200;
  result["msg"] = "로그아웃 완료";
  req.session.destroy();
  console.log(`로그아웃 확인${req}`);
  res.json(result);
});

module.exports = router;
