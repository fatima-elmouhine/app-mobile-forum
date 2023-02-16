const {getQuestions, postQuestion, getQuestion, updateQuestion, deleteQuestion} = require('../controllers/questions')

const express = require('express');
const router = express.Router();

router.get('/', getQuestions);

router.get('/:id', getQuestion);

router.post('/', postQuestion);

router.put('/', updateQuestion);

router.delete('/:id', deleteQuestion);

module.exports = router