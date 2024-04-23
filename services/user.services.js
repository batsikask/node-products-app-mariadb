const userEntity = require('../model/User').UserEntity
const dataSource = require('../connect').dataSource

async function findAll() {
    const result = await dataSource
    .getRepository(userEntity)
    .createQueryBuilder('user')
    .getMany()

    return result
}

async function findOne(username) {
    const result = await dataSource
    .getRepository('user')
    .createQueryBuilder('user')
    .where('user.username = :username', {username: username})
    .getOne()
    return result
}

async function create(data) {
    const result = await dataSource
    .getRepository(userEntity)
    .save(data)
    .catch((err) => Promise.reject(err))
    return result
}

async function update(data) {
    const result = await dataSource
    .getRepository(userEntity)
    .createQueryBuilder()
    .update(userEntity)
    .set({name: data.name}, 
        {surname: data.surname}, 
        {email: data.email},
        {area: data.area},
        {road: data.road},
        {phone: data.phone})
        .where('id = :id', {id: data.id})
        .execute()
        .catch((err) => Promise.reject(err))
        return result
}

async function deleteUser(username) {
    const result = await dataSource
    .getRepository(userEntity)
    .createQueryBuilder()
    .delete()
    .from(userEntity)
    .where('username = :username', {username: username})
    .execute()
    .catch((err) => Promise.reject(err))
    return result
}

module.exports = { findAll, findOne, create, update, deleteUser }