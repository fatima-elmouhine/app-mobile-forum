const {postQcmQuestion} = require('../controllers/qcms')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");

router.post('/', auth, postQcmQuestion);

module.exports = router;