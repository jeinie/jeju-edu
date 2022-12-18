const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Study = require("../models/study");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleWare = require("./authMiddleWare");
const userAgentMiddleWare = require("./userAgentMiddleWare");

const {
  sendVerificationsSMS,
  verifySMSMsg,
  getNewPw,
} = require("../dto/NVsens");
/*
const {
  sendVerificationsSMS,
  verifySMSMsg,
  getNewPw,
} = require("../../../configs/dto/NVsens");
*/
router.get(
  "/message/code",
  userAgentMiddleWare("/api/auth/message/code"),
  sendVerificationsSMS
);

router.get(
  "/message/verifySMSMsg",
  userAgentMiddleWare("/api/auth/message/verifySMSMsg"),
  verifySMSMsg
);

/**
 * 비번찾기 "휴대폰 문자"
 * 가입한 휴대폰번호로 임시 비밀번호 발급해야함
 * 1. 비밀번호 10자리 재발급 (알파벳 숫자 섞여서)
 * 2. 재발급한 비밀번호 DB에 업데이트
 * 3. 해당 비밀번호 문자로 전송
 */

router.post(
  "/message/findPW",
  userAgentMiddleWare("/api/auth/message/findPW"),
  getNewPw
);

/**
 * 비번 변경
 *
 */
router.post(
  "/message/modifyPW",
  userAgentMiddleWare("/api/auth/message/modifyPW"),
  async (req, res, next) => {
    try {
      const { id, newPw, pw } = req.body;
      const exUser = await User.findOne({ where: { id: id } });
      const Flag = await bcrypt.compare(pw, exUser.dataValues.password);
      console.log(Flag);
      if (Flag) {
        await User.update(
          { password: await bcrypt.hash(newPw, 12) },
          { where: { id: id } }
        );
        res.status(200).json({
          code: 200,
          message: "비밀번호 변경 성공",
        });
      } else {
        res.status(202).json({
          code: 202,
          message: "현재 비밀번호 인증 실패",
        });
      }
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: `비밀번호 변경 중 서버내 알수없는 에러발생 ${e}`,
      });
    }
  }
);

/**
 * 아이디 중복체크만 따로 분리
 */
router.post(
  "/checkDupId",
  userAgentMiddleWare("/api/auth/checkDupId"),
  async (req, res, next) => {
    /**
     * 회원가입 시 비밀번호 암호화
     */
    try {
      const { id } = req.body;
      const exUser = await User.findOne({ where: { id: id } });
      if (exUser) {
        res.status(201).json({
          code: 201,
          message: "아이디 중복입니다",
        });
      } else {
        console.log(`아이디 중복체크 여부${exUser}`);
        res.status(200).json({
          code: 200,
          message: "사용 가능한 아이디입니다",
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `아이디 중복체크 시도중 에러발생 ${error}`,
      });
      return next(error);
    }
  }
);

router.post(
  "/join",
  userAgentMiddleWare("/api/auth/join"),
  async (req, res, next) => {
    const result = {};
    /**
     * 회원가입 시 비밀번호 암호화
     */
    try {
      const { id, nick = "", pw, name, tel } = req.body;
      const hashPw = await bcrypt.hash(pw, 12);
      const exUser = await User.findOne({ where: { id: id } });
      if (exUser) {
        result["success"] = 100;
        result["msg"] = "아이디 중복입니다";
        res.json(result);
        return;
      }
      await User.create({
        id,
        nick: nick,
        password: hashPw,
        name,
        tel: tel,
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

router.get("/logout", (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.cookie("refreshToken", "");
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
