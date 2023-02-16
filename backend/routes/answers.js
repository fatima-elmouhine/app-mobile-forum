const {getAnswers, postAnswer, getAnswer, updateAnswer, deleteAnswer} = require('../controllers/answers')

const express = require('express');
const router = express.Router();

router.get('/', getAnswers);

router.get('/:id',getAnswer)

router.post('/', postAnswer);

router.put('/', updateAnswer);

router.delete('/:id', deleteAnswer);

module.exports = router;