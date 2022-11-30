const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Study = require("../models/study");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleWare = require("./authMiddleWare");
const userAgentMiddleWare = require("./userAgentMiddleWare");

router.post(
  "/join",
  userAgentMiddleWare("/api/auth/join"),
  async (req, res, next) => {
    const result = {};
    //const { id, pw, name } = req.body;
    const { id, pw, name, nick } = req.body;
    /**
     * 회원가입 시 비밀번호 암호화
     */
    const hashPw = await bcrypt.hash(pw, 12);
    try {
      const exUser = await User.findOne({ where: { id: id } });
      if (exUser) {
        result["success"] = 100;
        result["msg"] = "아이디 중복입니다";
        res.json(result);
        return;
      }
      await User.create({
        id,
        password: hashPw,
        name,
        nick: nick,
      });
      console.log(
        `회원가입 정보\nid : ${id}\npw : ${hashPw}\nname : ${name}\nnick : ${nick}`
      );
      result["success"] = 200;
      result["msg"] = "회원가입 성공";
      res.json(result);
    } catch (error) {
      result["success"] = 500;
      result["msg"] = `회원가입 실패 error : ${error}`;
      res.json(result);
      console.error(error);
      return next(error);
    }
  }
);

router.post(
  "/login",
  userAgentMiddleWare("/api/auth/login"),
  async (req, res, next) => {
    const { id, pw } = req.body;
    /**
     * 로그인 시 비밀번호 암호화
     */

    let accessToken = "";
    let refreshToken = "";

    try {
      let exUser = await User.findOne({
        where: { id: id },
      });

      if (exUser == null) {
        res.status(403).json({
          code: 403,
          message: "Failed to Search User",
        });
        return;
      }

      const Flag = await bcrypt.compare(pw, exUser.dataValues.password);

      if (!Flag) {
        res.status(403).json({
          code: 403,
          message: "Failed to Search User",
        });
        return;
      }

      /**
       * 원래자리
       */
      const { password, createdAt, updatedAt, deletedAt, ...others } =
        exUser.dataValues;
      if (exUser != null) {
        accessToken = jwt.sign(
          {
            type: "JWT",
            id: id,
            profile: others,
          },
          process.env.ACCESS_SECRET_KEY,
          {
            expiresIn: "1m",
            issuer: "admin",
          }
        );

        refreshToken = jwt.sign(
          {
            type: "JWT",
            id: id,
            profile: others,
          },
          process.env.REFRESH_SECRET_KEY,
          {
            expiresIn: "30m",
            issuer: "admin",
          }
        );

        /**
         * 만들어진 access, refresh 토큰 전송
         */
        res.cookie("accessToken", accessToken, {
          /**
           * https 와 http의 차이 명시
           * http 사용임으로 false
           */
          secure: false,
          /**
           * javaScript와 http중 어디서 접근이 가능할지 명시
           * javaScript에서 cookie접근이 불가능하게 true
           */
          httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });

        res.status(200).json({
          code: 200,
          message: "JWT Token is Created",
          //accessToken: accessToken,
          //refreshToken: refreshToken,
          id: id,
          userInfo: others,
        });
      } else {
        res.status(403).json({
          code: 403,
          message: `Failed to Search User error : ${error}`,
        });
      }
    } catch (error) {
      console.log(`/auth/api/login에서 에러발생 ${error}`);
      res.status(500).json({
        code: 500,
        message: `Failed to create jwt token error : ${error}`,
      });
    }
  }
);

/**
 * url : /api/payload
 * 토큰의 유효값을 체크하거나
 * accessToken의 유효시간이 다되었을때 && refreshToken의 유효시간이 덜 되었을때 accessToken을 재발급하는 로직
 * accessToken의 유효시간이 다되었을때 && refreshToken의 유효시간이 다되었을때 client에 특정값을 return하여
 * login페이지로 redirect를 유도하는 로직이 담겨있다
 */
router.get(
  "/payload",
  userAgentMiddleWare("/api/auth/payload"),
  authMiddleWare,
  (req, res) => {
    return res.status(200).json({
      code: 200,
      message: "토큰이 정상입니다.",
      data: {
        id: req.decoded.id,
        profile: req.decoded.profile,
      },
    });
  }
);

router.get("/api/logout", (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.status(200).json({
      code: 200,
      message: "Logout Success",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
    });
  }
});

module.exports = router;
