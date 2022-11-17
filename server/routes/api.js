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

module.exports = router;
