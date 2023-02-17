const {getThemes, postTheme, getTheme, updateTheme, deleteTheme, uploadTheme} = require('../controllers/themes')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, body, cb) => {
        cb(null, './public/imageTheme')
    },
    filename: (req, body, cb) => {
        cb(null, `image-${Date.now()}.${body.type.split("/")[1]}`)
    }
})


const upload = multer({ storage: storage })

router.get('/', getThemes);

router.get('/:id', getTheme);

router.post('/', auth, postTheme);

router.put('/', auth, updateTheme);

router.post('/imageTheme',upload.single('imageTheme'),(req,res,next) => {console.log(req.file); next()}, uploadTheme)

router.delete('/', auth, deleteTheme);

module.exports = router;