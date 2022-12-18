const express = require("express");
const session = require("express-session");
const StudyAllList = require("../models/studyAllList");
const Study = require("../models/study");
const JejuAreaDB = require("../models/jejuAreaDB");
let { Op } = require("sequelize");
const { route } = require("./page");
const router = express.Router();
const userAgentMiddleWare = require("./userAgentMiddleWare");
const authMiddleWare = require("./authMiddleWare");

router.get(
  "/getStudyList/code",
  userAgentMiddleWare("/api/getStudyList/code"),
  //authMiddleWare,
  async (req, res, next) => {
    try {
      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              study_category: {
                [Op.like]: `%프로그래밍%`,
              },
            },
          ],
        },
      });

      if (studyList) {
        Array.from(studyList).forEach((item) => {
          let concat = item.studyAt_location.split(" ");
          let result = concat[1] + " " + concat[2];
          item.studyAt_location = result;
        });

        res.status(200).json({
          code: 200,
          message: `프로그래밍 관련 스터디 추출 성공`,
          studyList: studyList,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `프로그래밍 관련 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  }
);

router.get(
  "/getStudyList/sing",
  userAgentMiddleWare("/api/getStudyList/sing"),
  //authMiddleWare,
  async (req, res, next) => {
    try {
      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              study_category: {
                [Op.like]: `%보컬댄스%`,
              },
            },
          ],
        },
      });

      if (studyList) {
        Array.from(studyList).forEach((item) => {
          let concat = item.studyAt_location.split(" ");
          let result = concat[1] + " " + concat[2];
          item.studyAt_location = result;
        });

        res.status(200).json({
          code: 200,
          message: `보컬댄스 관련 스터디 추출 성공`,
          studyList: studyList,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `보컬댄스 관련 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  }
);

router.get(
  "/getStudyList/design",
  userAgentMiddleWare("/api/getStudyList/design"),
  //authMiddleWare,
  async (req, res, next) => {
    try {
      //let studyList = await Study.findAll({});
      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              study_category: {
                [Op.like]: `%디자인%`,
              },
            },
          ],
        },
      });

      if (studyList) {
        Array.from(studyList).forEach((item) => {
          let concat = item.studyAt_location.split(" ");
          let result = concat[1] + " " + concat[2];
          item.studyAt_location = result;
        });
        res.status(200).json({
          code: 200,
          message: `디자인 관련 스터디 추출 성공`,
          studyList: studyList,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `디자인 관련 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  }
);
/**
 * 이거 검색창에 위치기반 검색하면 뜨게하려는것같은데 현석이형이
 * 흠..
 */
router.post(
  "/getStudyList",
  userAgentMiddleWare("/api/getStudyList"),
  authMiddleWare,
  async (req, res, next) => {
    try {
      const { area } = req.body;

      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              studyAt_location: {
                [Op.like]: `%${area}%`,
              },
            },
          ],
        },
      });
      console.log(studyList);

      if (studyList) {
        for (var i = 0; i < studyList.length; i++) {
          let concat = studyList[i].studyAt_location.split(" ");
          let result = concat[1] + " " + concat[2];
          studyList[i].studyAt_location = result;
        }

        res.status(200).json({
          code: 200,
          message: `${area}지역범위 내의 스터디 추출 성공`,
          studyList: studyList,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `${area}지역범위 내의 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  }
);

/*
 * 내가 개설한 스터디들만 보기
 */
router.get(
  "/getStudyListMine/:id",
  userAgentMiddleWare("/api/getStudyListMine/:id"),
  authMiddleWare,
  async (req, res, next) => {
    const statusList = ["모집중", "인원마감", "진행중", "완료", "종료"];
    try {
      const studyList = await Study.findAll({
        where: {
          who_open: req.params.id,
        },
      });

      let dayArr = JSON.stringify(new Date()).split("T")[0].substring(1, 11);
      const todayDate = dayArr.replaceAll("-", "");

      Array.from(studyList).forEach((item) => {
        let concat = item.studyAt_location.split(" ");
        let result = concat[1] + " " + concat[2];
        item.studyAt_location = result;

        if (item.deadline != null) {
          item.deadline = item.deadline.replaceAll("-", "");
          item.studyAt_date = item.studyAt_date.replaceAll("-", "");
          if (todayDate > item.deadline || todayDate > item.studyAt_date) {
            item.status = statusList[4];
            return;
          }
        }
        item.status = statusList[item.status];
      });

      res.status(200).json({
        code: 200,
        message:
          "성공적으로 다른 유저가 개설한 스터디 목록 불러오기가 성공했습니다",
        studyListMine: studyList,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `알수없는 에러가 서버내에서 발생했습니다 error : ${error}`,
      });
      return next(error);
    }
  }
);

/**
 * 다른사람이 개설한 스터디들만 보기
 */
router.get(
  "/getStudyListNotMine/:id",
  userAgentMiddleWare("/api/getStudyListNotMine/:id"),
  authMiddleWare,
  async (req, res, next) => {
    const statusList = ["모집중", "인원마감", "진행중", "완료", "종료"];
    try {
      const studyList = await Study.findAll({
        where: {
          who_open: { [Op.ne]: req.params.id },
        },
      });

      let dayArr = JSON.stringify(new Date()).split("T")[0].substring(1, 11);
      const todayDate = dayArr.replaceAll("-", "");

      Array.from(studyList).forEach((item) => {
        let concat = item.studyAt_location.split(" ");
        let result = concat[1] + " " + concat[2];
        item.studyAt_location = result;

        if (item.deadline != null) {
          item.deadline = item.deadline.replaceAll("-", "");
          item.studyAt_date = item.studyAt_date.replaceAll("-", "");
          if (todayDate > item.deadline || todayDate > item.studyAt_date) {
            item.status = statusList[4];
            return;
          }
        }
        item.status = statusList[item.status];
      });

      res.status(200).json({
        code: 200,
        message:
          "성공적으로 다른 유저가 개설한 스터디 목록 불러오기가 성공했습니다",
        studyListNotMine: studyList,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `알수없는 에러가 서버내에서 발생했습니다 error : ${error}`,
      });
      return next(error);
    }
  }
);

router.post(
  "/openStudy",
  userAgentMiddleWare("/api/openStudy"),
  authMiddleWare,
  async (req, res, next) => {
    const result = {};
    const {
      who_open,
      study_title,
      study_category,
      study_detail_description,
      min_member_cnt,
      studyAt_date,
      studyAt_location,
      tmX,
      tmY,
      deadline,
      status,
    } = req.body;

    console.log(tmX);
    console.log(tmY);

    try {
      await Study.create({
        who_open: who_open,
        study_title: study_title,
        study_category: study_category,
        study_detail_description: study_detail_description,
        min_member_cnt: min_member_cnt,
        studyAt_date: studyAt_date,
        studyAt_location: studyAt_location,
        tmX: tmX,
        tmY: tmY,
        deadline: deadline,
        status: status,
      });
      res.status(200).json({
        code: 200,
        message: `스터디 개설 성공`,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `알수없는 서버내의 이유로 스터디 개설 실패${error}`,
      });
      return next(error);
    }
  }
);

router.post(
  "/joinStudy",
  userAgentMiddleWare("/api/joinStudy"),
  authMiddleWare,
  async (req, res, next) => {
    const { user_no, study_no } = req.body;
    try {
      await StudyAllList.create({
        study_no: study_no,
        user_no: user_no,
      });

      const studyInfo = await Study.findOne({ where: { study_no: study_no } });

      /**
       * study의 상태가 모집중( 0 )이 아니라면 더 참가할수가 없겠다
       */
      if (studyInfo.status != 0) {
        res.status(500).json({
          code: 500,
          message: `프론트에서 미리 막아두겠지만 혹시나해서 만든 에러 처리 코드 : 스터디가 모집중인 상태가 아님으로 참여 실패 error : ${error}`,
        });
        return;
      }

      await Study.increment(
        { current_member_cnt: 1 },
        { where: { study_no: study_no } }
      );

      res.status(200).json({
        code: 200,
        message: `해당 스터디에 참여 성공`,
        updated_current_member_cnt: studyInfo.current_member_cnt + 1,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `알수없는 서버내의 이유로 스터디 참여 실패 error : ${error}`,
      });
      return next(error);
    }
  }
);

router.post(
  "/closeStudy",
  userAgentMiddleWare("/api/closeStudy"),
  authMiddleWare,
  async (req, res, next) => {
    const { study_no } = req.body;
    try {
      await Study.destroy({ where: { study_no: study_no } });

      res.status(200).json({
        code: 200,
        message: `study delete success`,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `study delete 중 알수없는 에러가 서버내에서 발생 : ${error} 또는 이미 삭제된 데이터일수 있습니다`,
      });
      return next(error);
    }
  }
);

module.exports = router;
