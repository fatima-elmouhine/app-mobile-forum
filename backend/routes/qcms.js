const {getQcms, postQcm, getQcm, updateQcm, deleteQcm} = require('../controllers/qcms')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");

router.get('/',getQcms);

router.get('/:id', getQcm);

router.post('/', auth, postQcm);

router.put('/:id', auth, updateQcm);

router.delete('/:id', auth, deleteQcm);

module.exports = router;