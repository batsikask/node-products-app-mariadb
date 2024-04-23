const productEntity = require('../model/Product').ProductEntity
const dataSource = require('../connect').dataSource

async function findAll() {
    const result = await dataSource
        .getRepository(productEntity)
        .createQueryBuilder('product')
        .getMany()

    return result
}

async function findOne(title) {
    const result = await dataSource
        .getRepository(productEntity)
        .createQueryBuilder()
        .where('product.title = :title', { title: title })
        .getOne();

    return result;
}

async function create(data) {
    const result = await dataSource
    .getRepository(productEntity)
    .save(data)
    .catch((err) => Promise.reject(err))
    return result
}

async function update(data) {
    const result = await dataSource
    .getRepository(productEntity)
    .createQueryBuilder()
    .update(productEntity)
    .set({title: data.title}, 
        {cost: data.cost}, 
        {description: data.description}, 
        {quantity: data.quantity})
    .where('id = :id', {id: data.id})
    .execute()
    .catch((err) => Promise.reject(err))
    return result
}

async function deleteProduct(title) {
    const result = await dataSource
    .getRepository(productEntity)
    .createQueryBuilder()
    .delete()
    .from(productEntity)
    .where('title = :title', {title: title})
    .execute()
    .catch((err) => Promise.reject(err))
    return result
}

module.exports = { findAll, findOne, create, update, deleteProduct }