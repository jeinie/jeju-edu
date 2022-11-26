const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Study = require("../models/study");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./authMiddleWare");
const userAgentMiddleWare = require("./userAgentMiddleWare");

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

router.post(
  "/api/login",
  userAgentMiddleWare("/api/login"),
  async (req, res, next) => {
    const { id, password } = req.body;
    let token = "";
    try {
      const exUser = await User.findOne({
        where: { id: id, password: password },
      });
      if (exUser != null) {
        token = jwt.sign(
          {
            type: "JWT",
            id: id,
            profile: exUser.dataValues,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "15m",
            issuer: "admin",
          }
        );
        res.status(200).json({
          code: 200,
          message: "JWT Token is Created",
          token: token,
        });
      } else {
        res.status(200).json({
          code: 100,
          message: "Failed to Search User",
        });
      }
    } catch (error) {
      console.log(`/auth/api/login에서 에러발생 ${error}`);
      res.status(200).json({
        code: 101,
        message: "Failed to create jwt token",
      });
    }
  }
);

router.get("/api/payload", auth, (req, res) => {
  const id = req.decoded.id;
  const profile = req.decoded.profile;
  return res.status(200).json({
    code: 200,
    message: "토큰이 정상입니다.",
    data: {
      id: id,
      profile: profile,
    },
  });
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
