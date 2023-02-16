const { postQcmQuestion, deleteQcmQuestion } = require('../controllers/qcms')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");

router.post('/', auth, postQcmQuestion);

router.delete('/', auth, deleteQcmQuestion);

module.exports = router;