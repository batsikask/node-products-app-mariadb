const userService = require('../services/user.services')
const logger = require('../logger/logger')

exports.findAll = async (req, res) => {
    console.log("Find all users");
    try {
        const result = await userService.findAll();
        res.status(200).json({data: result});
        logger.debug("Success in reading all users")
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while fetching all users -- ${err}`)
    }

}

exports.findOne = async (req, res) => {
    console.log("Find a user");
    const username = req.params.username;
    try {
        const result = await userService.findOne({username: username})
        res.status(200).json({data: result})
        logger.debug("Found a user: " + result.username)
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while fetching user -- ${err}`)
    }
}

exports.create = async (req, res) => {
    console.log("Insert a user")
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        area: req.body.area,
        road: req.body.road,
        phone: req.body.phone
    }
    try {
        const result = await userService.create(newUser)
        res.status(200).json({data: result})
        logger.debug("User inserted -- " + result.username)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while inserting a user -- ${err}`)
    }
}

exports.update = async(req, res) => {
    const id = req.params.id
    console.log("Update user with id: " + id)
    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }
    try {
        const result = await userService.update(updateUser)
        res.status(200).json({data: result})
        logger.debug("Updated user: " + result.username)
    } catch (err) {
        res.status(400).json({data: err})
        logger.error(`Error while updating a user -- ${err}`)
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username
    console.log("Delete user with username: " + username)
    try {
        const result = await userService.deleteUser({username})
        res.status(200).json({data: result})
        logger.debug("User deleted -- " + username)
    } catch (err) {
        res.status(404).json({data: err})
        logger.error(`Error while deleting a user -- ${err}`)
    }
}