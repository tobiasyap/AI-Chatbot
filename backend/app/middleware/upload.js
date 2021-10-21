const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../files/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })

var upload = multer({ storage: storage })

module.exports = upload