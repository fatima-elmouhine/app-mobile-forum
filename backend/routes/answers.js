import {getanswers, postanswer, getanswer, updateanswer, deleteanswer} from '../controllers/answers'

const express = require('express');
const router = this.express.Router();

router.get('/answers', (req, res) => {
    getanswers(req, res);
});

router.get('/answers/:id', (req, res) => {
    getanswer(req, res);
});

router.post('/answers', (req, res) => {
    postanswer(req, res);
});

router.update('/answers/:id', (req, res) => {
    updateanswer(req, res);
});

router.delete('/answers/:id', (req, res) => {
    deleteanswer(req, res);
});

module.exports = router;