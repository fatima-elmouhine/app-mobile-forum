const {getResultsByUser, getResultsByTheme, getresult, loginresult, updateresult, deleteresult} = require('../controllers/results')
const auth = require("../Tools/auth");

const express = require('express');
const router = express.Router();

router.get('/', auth, getResultsByUser);
router.get('/:id_theme', auth, getResultsByTheme);

// router.get('/results/:id', (req, res) => {
//     getresult(req, res);
// });

// router.post('/results', (req, res) => {
//     postresult(req, res);
// });

// router.put('/results/:id', (req, res) => {
//     updateresult(req, res);
// });

// router.delete('/results/:id', (req, res) => {
//     deleteresult(req, res);
// });

module.exports = router;