const express = require("express");
const session = require("express-session");
const Study = require("../models/study");
const StudyAttendsStatus = require("../models/studyAttendsStatus");
const 
const { Op } = require("sequelize");
const { route } = require("./page");

const router = express.Router();

router.get("/getStudyList", async (req, res, next) => {
  try {
    const studyList = await Study.findAll({});
    console.log(studyList);
    Array.from(studyList).forEach((item) => {
      let concat = item.location.split(" ");
      let result = concat[1] + " " + concat[2];
      item.location = result;
    });

    if (studyList) {
      res.json(studyList);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/getStudyList/:search", async (req, res, next) => {
  try {
    const search = req.params.search;
    console.log(search);
    /*
    const studyList = await Study.findAll({});
    console.log(studyList);
    Array.from(studyList).forEach((item) => {
      let concat = item.location.split(" ");
      let result = concat[1] + " " + concat[2];
      item.location = result;
    });

    if (studyList) {
      res.json(studyList);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
  */
});

/*
 * 내가 개설한 스터디들만 보기
 */
router.get("/getStudyListMine/:id", async (req, res, next) => {
  try {
    /*
    const studyList = await StudyAttendsStatus.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (studyList) {
      let keyArr = [];
      let resultArr = [];
      console.log(`MyStudyList는 ${studyList}`);

      Array.from(studyList).forEach((item) => {
        keyArr.push(item.study_no);
      });
      
      Array.from(keyArr).forEach((item)=>{
        resultArr.push( item )
      })
      res.json(studyList[0]);
    }
    */
    const studyList = await Study.findAll({
      where: {
        who_open: req.params.id,
      },
    });
    console.log("오늘은");
    let dayArr = JSON.stringify(new Date()).split("T")[0].substring(1, 11);
    //.split("-");
    //const todayDate = dayArr[0] + dayArr[1] + dayArr[2];
    const todayDate = dayArr.replaceAll("-", "");
    console.log(todayDate);

    let closeDate = "";
    let deadline = "";

    Array.from(studyList).forEach((item) => {
      if (item.closeDate != null) {
        closeDate = item.closeDate.replaceAll("-", "");
      }
      if (item.deadline != null) {
        deadline = item.deadline.replaceAll("-", "");
      }
      if (item.status == "수확완료") return;
      if (item.members < 10) {
        item.status = "대기";
      } else if (item.members >= 10) {
        item.members = 10;
        item.status = "매칭";
      } else if (todayDate > closeDate) {
        item.status = "실패";
      } else if (todayDate > deadline) {
        item.status = "마감";
      }
    });

    //console.log(studyList);
    res.json(studyList);
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
    const studyList = await Study.findAll({
      where: {
        who_open: { [Op.ne]: req.params.id },
      },
    });

    let dayArr = JSON.stringify(new Date()).split("T")[0].substring(1, 11);
    //.split("-");
    //const todayDate = dayArr[0] + dayArr[1] + dayArr[2];
    const todayDate = dayArr.replaceAll("-", "");
    console.log(todayDate);

    let closeDate = "";
    let deadline = "";

    Array.from(studyList).forEach((item) => {
      if (item.closeDate != null) {
        closeDate = item.closeDate.replaceAll("-", "");
      }
      if (item.deadline != null) {
        deadline = item.deadline.replaceAll("-", "");
      }
      if (item.status == "수확완료") return;
      if (item.members < 10) {
        item.status = "대기";
      } else if (item.members >= 10) {
        item.members = 10;
        item.status = "매칭";
      } else if (todayDate > closeDate) {
        item.status = "실패";
      } else if (todayDate > deadline) {
        item.status = "마감";
      }
    });

    console.log(`다른사람의studyList는 ${studyList}`);
    console.log(studyList);
    res.json(studyList);
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
      members: 0,
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

    const studyInfo = await Study.findOne({ where: { study_no: study_no } });

    if (studyInfo.members >= 10) {
      result["success"] = 100;
      result["msg"] = "이미 10명 이상입니다";
      result["members"] = 10;
      res.send(result);
      return;
    }

    if (studyInfo.members % 3 == 0) {
      await Study.increment({ status: 1 }, { where: { study_no: study_no } });
    }

    await Study.increment({ members: 1 }, { where: { study_no: study_no } });

    result["success"] = 200;
    result["msg"] = "study 테이블 join 성공";
    result["members"] = (
      await Study.findOne({ where: { study_no: study_no } })
    ).members;
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
