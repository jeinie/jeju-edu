const express = require("express");
const { User, Study } = require("../models");
const path = require("path");
const router = express.Router();

router.post("/viewDetail/:study_no", async (req, res) => {
  const result = {};
  try {
    const studyInfo = await Study.findOne({
      where: { study_no: req.params.study_no },
    });

    studyInfo.createdAt = studyInfo.createdAt.split(" ")[0];
    studyInfo.updatedAt = studyInfo.updatedAt.split(" ")[0];
    console.log(`처리1 ${studyInfo}`);
    console.log(`처리2 ${studyInfo.createdAt}`);
    console.log(`처리3 ${studyInfo.updatedAt}`);

    if (studyInfo) {
      result["success"] = 200;
      result["msg"] = "studyInfo 전달 성공";
      result["studyInfo"] = studyInfo;
      res.json(result);
    } else {
      result["success"] = 100;
      result["msg"] = "studyInfo 조회 / 전달 실패";
      res.json(result);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/", (req, res) => {
  console.log("여기까지옴1234");
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (e) {
    console.log(`sendfile Error ${e}`);
  }
  return;
});

module.exports = router;
