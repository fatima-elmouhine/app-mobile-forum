const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");
const {getUsers, postUser, getUser, loginUser, updateUser, deleteUser} = require('../controllers/users')

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/',postUser);

router.post('/login', loginUser)

router.put('/' , auth, updateUser);

router.delete('/',auth ,deleteUser);

module.exports = router;