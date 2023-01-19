const express = require('express');
const router = express.Router();

const {
    count,
    submit,
} = require('../dao/survey/surveyModule');

// 시작 페이지 (참여자 수 카운팅)
router.get('/count', count);

// db 에 사용자 데이터 저장
router.post('/submit', submit);

module.exports = router;