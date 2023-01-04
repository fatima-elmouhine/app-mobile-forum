import {gettypes, posttype, gettype, logintype, updatetype, deletetype} from '../controllers/types'

const express = require('express');
const router = this.express.Router();

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