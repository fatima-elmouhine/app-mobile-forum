const {getThemes, postTheme, getTheme, updateTheme, deleteTheme, getQcms } = require('../controllers/themes')

const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, body, cb) => {
        cb(null, './public/imagesTheme')
    },
    filename: (req, body, cb) => {
        cb(null, `image-${Date.now()}.${body.type.split("/")[1]}`)
    }
})


const upload = multer({ storage: storage })

router.get('/', getThemes);

router.get('/getQcms/:id', getQcms);

router.get('/:id', getTheme);

router.post('/',upload.single('imageTheme'),(req,res,next) => {console.log('t la ?', req.body); next()}, auth, postTheme);

router.put('/',auth, updateTheme);

router.delete('/', auth, deleteTheme);

module.exports = router;