const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller')

router.get('/', productController.findAll)
router.get('/:title', productController.findOne)
router.post('/', productController.create)
router.patch('/:title', productController.update)
router.delete('/:title', productController.delete)

module.exports = router