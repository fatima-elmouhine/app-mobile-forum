const {getTypes, postTypes, getType, updateTypes, deleteTypes} = require('../controllers/types')

const express = require('express');
const router = express.Router();

router.get('/',getTypes);

router.post('/',postTypes);

router.get('/:id',getType);


router.put('/:id',updateTypes);

router.delete('/:id', deleteTypes);

module.exports = router;