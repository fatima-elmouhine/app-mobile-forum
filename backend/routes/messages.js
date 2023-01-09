const {getMessages, postMessage, getMessage, updateMessage, deleteMessage} = require('../controllers/messages')
const auth = require("../Tools/auth");
const express = require('express');
const router = express.Router();

router.get('/', getMessages);

router.get('/:id', getMessage);

router.post('/', postMessage);

router.put('/:id', updateMessage);

router.delete('/:id', auth, deleteMessage);

module.exports = router