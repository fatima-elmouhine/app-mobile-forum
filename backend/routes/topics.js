const {getTopics, postTopic, getTopic, updateTopic, deleteTopic, getMessagesTopic, postMessageTopic} = require('../controllers/topics')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");

router.get('/', getTopics);

router.get('/:id', getTopic);

router.post('/',auth , postTopic);

router.put('/',auth, updateTopic);

router.delete('/',auth, deleteTopic);

router.get('/:id/messages',auth, getMessagesTopic);
router.post('/:id/messages',auth, postMessageTopic);

module.exports = router;