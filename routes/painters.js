const express = require("express")
const router = express.Router();
const { deletePainter, getPainter, createPainters, getPainters } = require('../controlers/painters');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './assets/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  

const upload = multer({ storage });

router.get('/', getPainters)
router.get('/:id', getPainter)
router.delete('/:id', deletePainter)
router.post('/', upload.single('planeImage'), createPainters)

module.exports = router;