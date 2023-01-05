const {getTopics, postTopic, getTopic, updateTopic, deleteTopic, getMessagesTopic} = require('../controllers/topics')

const express = require('express');
const { getMessage } = require('../controllers/messages');
const router = express.Router();

router.get('/', getTopics);

router.get('/:id', getTopic);

router.post('/', postTopic);

router.put('/:id',updateTopic);

router.delete('/:id', deleteTopic);

router.get('/:id/messages', getMessagesTopic);

module.exports = router;