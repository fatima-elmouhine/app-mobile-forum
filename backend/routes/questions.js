const {getQuestions, postquestion, getquestion, loginquestion, updatequestion, deletequestion} = require('../controllers/questions')

const express = require('express');
const router = express.Router();

router.get('/', getQuestions);

router.get('/:id', (req, res) => {
    getquestion(req, res);
});

router.post('/', (req, res) => {
    postquestion(req, res);
});

router.put('/:id', (req, res) => {
    updatequestion(req, res);
});

router.delete('/:id', (req, res) => {
    deletequestion(req, res);
});

module.exports = router