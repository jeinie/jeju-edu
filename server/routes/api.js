const express = require("express");
const session = require("express-session");
const Study = require("../models/study");
const StudyAttendsStatus = require("../models/studyAttendsStatus");
const { Op } = require("sequelize");
const { route } = require("./page");

const router = express.Router();

router.get("/getStudyList", async (req, res, next) => {
  try {
    const studyList = await StudyAttendsStatus.findAll({});
    if (studyList) {
      console.log(`studyList는 ${studyList}`);
      console.log(studyList);
      //res.send(JSON.stringify(studyList));
      res.json(studyList);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
/*
 * 내가 개설한 스터디들만 보기
 */
router.get("/getStudyListMine/:id", async (req, res, next) => {
  try {
    const studyList = await StudyAttendsStatus.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (studyList) {
      console.log(`MyStudyList는 ${studyList}`);
      console.log(studyList);
      res.json(studyList);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/**
 * 다른사람이 개설한 스터디들만 보기
 */
router.get("/getStudyListNotMine/:id", async (req, res, next) => {
  try {
    const studyList = await StudyAttendsStatus.findAll({
      where: {
        id: { [Op.ne]: req.params.id },
      },
    });
    if (studyList) {
      console.log(`다른사람의studyList는 ${studyList}`);
      console.log(studyList);
      res.json(studyList);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/openStudy", async (req, res, next) => {
  const result = {};
  const {
    study_name,
    who_open,
    study_category,
    study_detail,
    members,
    min_party,
    open_date,
    close_date,
    study_date,
    location,
    tmX,
    tmY,
    deadline,
  } = req.body;

  console.log(tmX);
  console.log(tmY);

  try {
    await Study.create({
      study_name: study_name,
      who_open: who_open,
      study_category: study_category,
      study_detail: study_detail,
      members: members,
      min_party: min_party,
      open_date: open_date,
      close_date: close_date,
      study_date: study_date,
      location: location,
      tmX: tmX,
      tmY: tmY,
      deadline: deadline,
    });
    result["success"] = 200;
    result["msg"] = "study 테이블 insert 성공";
    res.json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/joinStudy", async (req, res, next) => {
  const result = {};
  const { study_no, id } = req.body;

  try {
    await StudyAttendsStatus.create({
      study_no: study_no,
      id: id,
    });

    await Study.increment({ members: 1 }, { where: { study_no: study_no } });

    result["success"] = 200;
    result["msg"] = "study 테이블 join 성공";
    res.json(result);
  } catch (error) {
    result["success"] = 100;
    result["msg"] = `/joinStudy 에서 에러 발생 ${error}`;
    res.json(result);
    console.error(error);
    return next(error);
  }
});

router.post("/closeStudy", async (req, res, next) => {
  const result = {};
  const { study_no } = req.body;
  try {
    await Study.destroy({ where: { study_no: study_no } });
    result["success"] = 200;
    result["msg"] = "study 테이블 delete 성공";
    res.json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
