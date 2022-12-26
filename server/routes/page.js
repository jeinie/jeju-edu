const express = require('express');
const { User, Study } = require('../models');
const path = require('path');
const router = express.Router();
const userAgentMiddleWare = require('./userAgentMiddleWare');
const authMiddleWare = require('./authMiddleWare');

router.post(
  '/api/viewDetail/:study_no',
  userAgentMiddleWare('/viewDetail/:study_no'),
  //authMiddleWare,
  async (req, res) => {
    try {
      const studyInfo = await Study.findOne({
        where: { study_no: req.params.study_no },
      });

      let concat = studyInfo.studyAt_location.split(' ');
      let result1 = concat[1] + ' ' + concat[2];
      studyInfo.studyAt_location = result1;

      res.status(200).json({
        code: 200,
        message: 'studyInfo 전달 성공',
        study_Detail_Info: studyInfo,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `studyInfo추출중에 서버내 알수없는 에러발생 error : ${error}`,
      });
      return next(error);
    }
  },
);

router.get('/', userAgentMiddleWare('/'), authMiddleWare, (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (e) {
    console.log(`sendfile Error ${e}`);
  }
  return;
});

module.exports = router;
