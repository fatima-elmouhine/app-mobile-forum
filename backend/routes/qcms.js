const {getQcms, postQcm, getQcm, updateQcm, deleteQcm} = require('../controllers/qcms')

const express = require('express');
const router = express.Router();

router.get('/',getQcms);

router.get('/:id', getQcm);

router.post('/', postQcm);

router.put('/', updateQcm);

router.delete('/', deleteQcm);

module.exports = router;