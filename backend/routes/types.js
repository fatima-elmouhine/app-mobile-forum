const {gettypes, posttype, gettype, logintype, updatetype, deletetype} = require('../controllers/types')

const express = require('express');
const router = express.Router();

router.get('/types', (req, res) => {
    gettypes(req, res);
});

router.get('/types/:id', (req, res) => {
    gettype(req, res);
});

router.post('/types', (req, res) => {
    posttype(req, res);
});

router.update('/types/:id', (req, res) => {
    updatetype(req, res);
});

router.delete('/types/:id', (req, res) => {
    deletetype(req, res);
});

module.exports = router;