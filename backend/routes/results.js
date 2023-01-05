const {getresults, postresult, getresult, loginresult, updateresult, deleteresult} = require('../controllers/results')

const express = require('express');
const router = express.Router();

router.get('/results', (req, res) => {
    getresults(req, res);
});

router.get('/results/:id', (req, res) => {
    getresult(req, res);
});

router.post('/results', (req, res) => {
    postresult(req, res);
});

router.put('/results/:id', (req, res) => {
    updateresult(req, res);
});

router.delete('/results/:id', (req, res) => {
    deleteresult(req, res);
});

module.exports = router;