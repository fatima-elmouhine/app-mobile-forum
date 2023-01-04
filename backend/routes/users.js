const express = require('express');
const router = this.express.Router();
import {getUsers, postUser, getUser, loginUser, updateUser, deleteUser} from '../controllers/users'

router.get('/users', (req, res) => {
    getUsers(req, res);
});

router.get('/users/:id', (req, res) => {
    getUser(req, res);
});

router.post('/user', (req, res) => {
    postUser(req, res);
});

router.post('/login', (req, res) => {
    loginUser(req, res);
})

router.update('/users/:id', (req, res) => {
    updateUser(req,res);
});

router.delete('/users/:id', (req, res) => {
    deleteUser(req, res);
});

module.exports = router;