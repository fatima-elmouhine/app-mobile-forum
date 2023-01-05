const {getmessages, postmessage, getmessage, updatemessage, deletemessage} = require('../controllers/messages')

const express = require('express');
const router = express.Router();

router.get('/messages', (req, res) => {
    getmessages(req, res);
});

router.get('/messages/:id', (req, res) => {
    getmessage(req, res);
});

router.post('/messages', (req, res) => {
    postmessage(req, res);
});

router.update('/messages/:id', (req, res) => {
    updatemessage(req, res);
});

router.delete('/messages/:id', (req, res) => {
    deletemessage(req, res);
});

module.exports = router