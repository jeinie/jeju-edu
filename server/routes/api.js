const express = require("express");
const Study = require("../models/study");

const router = express.Router();

router.get("/getStudyList", async (req, res, next) => {
  try {
    const studyList = await Study.findAll({});
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
