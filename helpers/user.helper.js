const userEntity = require('../model/User').UserEntity
const dataSource = require('../connect').dataSource;

async function findLastInsertedUser(){
    const result = await dataSource
    .getRepository(userEntity)
    .createQueryBuilder('user')
    // .select('user)
    // .from(userEntity, 'user')
    .orderBy('user.id', 'DESC')
    .getOne()
    .catch((err) => logger.debug(`Error while fetching last inserted user -- ${err}`))
    return result;
}

module.exports = { findLastInsertedUser }