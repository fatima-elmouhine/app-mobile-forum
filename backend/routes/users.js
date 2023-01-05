const express = require('express');
const router = express.Router();
const {getUsers, postUser, getUser, loginUser, updateUser, deleteUser} = require('../controllers/users')

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/',postUser);

router.post('/login', loginUser)

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;