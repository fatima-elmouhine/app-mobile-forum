const {getThemes, postTheme, getTheme, updateTheme, deleteTheme} = require('../controllers/themes')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");

router.get('/', getThemes);

router.get('/:id', getTheme);

router.post('/',auth, postTheme);

router.put('/',auth, updateTheme);

router.delete('/', auth, deleteTheme);

module.exports = router;