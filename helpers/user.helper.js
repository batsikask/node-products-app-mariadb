const userEntity = require('../model/User').UserEntity
const dataSource = require('../connect').dataSource;
const logger = require('../logger/logger');

async function findLastInsertedUser(){
    const result = await dataSource
    .getRepository(userEntity)
    .createQueryBuilder('user')
    .orderBy('user.id', 'DESC')
    .getOne()
    .catch((err) => logger.debug(`Error while fetching last inserted user -- ${err}`))
    return result;
}

module.exports = { findLastInsertedUser }