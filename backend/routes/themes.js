const {getThemes, postTheme, getTheme, updateTheme, deleteTheme} = require('../controllers/themes')

const express = require('express');
const router = express.Router();

router.get('/', getThemes);

router.get('/:id', getTheme);

router.post('/', postTheme);

router.put('/', updateTheme);

router.delete('/', deleteTheme);

module.exports = router;