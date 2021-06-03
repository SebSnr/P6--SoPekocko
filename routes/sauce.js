const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config')
const saucesCtrl = require('../controllers/sauce')

router.post('/', multer, saucesCtrl.createSauce)
router.get('/:id', saucesCtrl.getOneSauce)
router.put('/:id', multer, saucesCtrl.modifySauce)
router.delete('/:id', saucesCtrl.deleteSauce)
router.get('/', saucesCtrl.getAllSauces)
router.post('/:id/like', saucesCtrl.likeSauce)

module.exports = router