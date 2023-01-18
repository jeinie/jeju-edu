const express = require('express');
const router = express.Router();

const {
    submit,
} = require('../dao/survey/surveyModule');

router.post('/submit', submit);

module.exports = router;