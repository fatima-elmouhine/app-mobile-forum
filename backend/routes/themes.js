const {getthemes, posttheme, gettheme, logintheme, updatetheme, deletetheme} = require('../controllers/themes')

const express = require('express');
const router = express.Router();

router.get('/themes', (req, res) => {
    getthemes(req, res);
});

router.get('/themes/:id', (req, res) => {
    gettheme(req, res);
});

router.post('/themes', (req, res) => {
    posttheme(req, res);
});

router.update('/themes/:id', (req, res) => {
    updatetheme(req, res);
});

router.delete('/themes/:id', (req, res) => {
    deletetheme(req, res);
});

module.exports = router;