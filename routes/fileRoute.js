const express = require('express')
const {
  getView,
  uploadfile
} = require('../controllers/convertFile.controller')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const getExt = file.originalname.split('.')
    cb(null, Date.now() + '.' + getExt[getExt.length - 1])
  }
})

const upload = multer({ storage: storage }).single('newFile')

router.get('/', getView)
router.post('/uploadfile', upload, uploadfile)

module.exports = { routes: router }
