const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.mimetype.split("/")[1]}`)
    }
})
const upload = multer({ storage: storage })

const {getUsers, postUser, getUser, loginUser, updateUser, deleteUser, uploadAvatar, getAvatar} = require('../controllers/users')

router.get('/', getUsers);

router.get('/:id', getUser);

router.get('/avatar/:id', getAvatar)

router.post('/',postUser);

router.post('/avatar',upload.single('avatar'),(req,res,next) => {console.log(req.file); next()} ,uploadAvatar)

router.post('/login', loginUser)

router.put('/' , auth, updateUser);

router.delete('/',auth ,deleteUser);

module.exports = router;