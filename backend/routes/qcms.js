const {getqcms, postqcm, getqcm, loginqcm, updateqcm, deleteqcm} = require('../controllers/qcms')

const express = require('express');
const router = express.Router();

router.get('/qcms', (req, res) => {
    getqcms(req, res);
});

router.get('/qcms/:id', (req, res) => {
    getqcm(req, res);
});

router.post('/qcms', (req, res) => {
    postqcm(req, res);
});

router.put('/qcms/:id', (req, res) => {
    updateqcm(req, res);
});

router.delete('/qcms/:id', (req, res) => {
    deleteqcm(req, res);
});

module.exports = router;