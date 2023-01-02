const express = require("express")
const router = express.Router();
const { deleteCategory, getCategories, createCategory } = require('../controlers/categories');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './assets/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  

const upload = multer({ storage });

router.get('/', getCategories)
router.delete('/:id', deleteCategory)
router.post('/', upload.single('planeImage'), createCategory)


module.exports = router;