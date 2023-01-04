const {gettopics, posttopic, gettopic, logintopic, updatetopic, deletetopic} = require('../controllers/topics')

const express = require('express');
const router = express.Router();

router.get('/topics', (req, res) => {
    gettopics(req, res);
});

router.get('/topics/:id', (req, res) => {
    gettopic(req, res);
});

router.post('/topics', (req, res) => {
    posttopic(req, res);
});

router.update('/topics/:id', (req, res) => {
    updatetopic(req, res);
});

router.delete('/topics/:id', (req, res) => {
    deletetopic(req, res);
});

module.exports = router;