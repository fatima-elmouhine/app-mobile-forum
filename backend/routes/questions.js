import {getquestions, postquestion, getquestion, loginquestion, updatequestion, deletequestion} from '../controllers/questions'

const express = require('express');
const router = this.express.Router();

router.get('/questions', (req, res) => {
    getquestions(req, res);
});

router.get('/questions/:id', (req, res) => {
    getquestion(req, res);
});

router.post('/questions', (req, res) => {
    postquestion(req, res);
});

router.update('/questions/:id', (req, res) => {
    updatequestion(req, res);
});

router.delete('/questions/:id', (req, res) => {
    deletequestion(req, res);
});

module.exports = router