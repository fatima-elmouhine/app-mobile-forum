const {getQcms, postQcm, getQcm, updateQcm, deleteQcm, generateQcm, playGame} = require('../controllers/qcms')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");

router.get('/generate/:limit/:idTheme',auth , generateQcm)

router.get('/',getQcms);

router.get('/:id', getQcm);

router.post('/', auth, postQcm);

router.put('/', auth, updateQcm);

router.delete('/', auth, deleteQcm);

router.post('/playingGame', auth, playGame);

module.exports = router;