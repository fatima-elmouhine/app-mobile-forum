const {getTopics, postTopic, getTopic, updateTopic, deleteTopic} = require('../controllers/topics')

const express = require('express');
const router = express.Router();

router.get('/', getTopics);

router.get('/:id', getTopic);

router.post('/', postTopic);

router.put('/:id',updateTopic);

router.delete('/:id', deleteTopic);

module.exports = router;