const productService = require('../services/product.services')
const logger = require('../logger/logger');


exports.findAll = async (req, res) => {
    console.log("Find all products")
    try {
        const result = await productService.findAll();
        res.status(200).json({data: result});
        logger.debug("Success in fetching all products")
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while fetching all products -- ${err}`)
    }
}

exports.findOne = async (req, res) => {
    console.log("Find a product")
    const title = req.params.title
    try {
        const result = await productService.findOne({title: title})
        res.status(200).json({data: result})
        logger.debug("Found a product: " + result.title)
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while fetching a product -- ${err}`)
    }
}

exports.create = async (req, res) => {
    console.log("Insert a product")
    const product = {
        title: req.body.title,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }
    try {
        const result = await productService.create(product)
        res.status(200).json({data: result})
        logger.debug("Controller - Product inserted -- " + result.title)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while inserting a product -- ${err}`)
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    console.log("Update product with id: ", id)
    const updateProduct = {
        title: req.body.title,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }
    try {
        const result = await productService.update(updateProduct)
        res.status(200).json({data: result})
        logger.debug("Updated product: " + updateProduct.title)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while update a product -- ${err}`)
    }
}

exports.delete = async (req, res) => {
    const title = req.params.title
    console.log("Delete product: " + title)
    try {
        const result = await productService.deleteProduct({title: title})
        res.status(200).json({data: result})
        logger.debug("Product deleted: " +  title)
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while deleting a product -- ${err}`)
    }
}