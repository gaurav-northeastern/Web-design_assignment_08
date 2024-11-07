const express = require('express');
const Router = express.Router();
const authController = require("../controllers/auth.controller");

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('Wrong Format.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


Router.post('/register', authController.registerNewUser);
Router.put('/edit', authController.modifyUser);
Router.delete('/delete', authController.removeAnyUser);
Router.get('/getAll', authController.displayAllUser);
Router.post('/uploadImage', upload.single('file'), authController.uploadImages);

module.exports = Router;
