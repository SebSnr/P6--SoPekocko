const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config')

const saucesCtrl = require('../controllers/sauce')

router.get('/', saucesCtrl.getAllSauces)
router.post('/', multer, saucesCtrl.createSauce)
router.get('/:id', saucesCtrl.getOneSauce)
router.put('/:id', multer, saucesCtrl.modifySauce)
router.delete('/:id', saucesCtrl.deleteSauce)

module.exports = router