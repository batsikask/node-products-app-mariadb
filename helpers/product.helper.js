const productEntity = require('../model/Product').ProductEntity
const dataSource = require('../connect').dataSource;
const logger = require('../logger/logger');

async function findLastInsertedProduct() {
    const result = await dataSource
    .getRepository(productEntity)
    .createQueryBuilder('prdct')
    .from(productEntity, 'product')
    .orderBy('prdct.id', 'DESC')
    .getOne()
    .catch((err) => logger.debug(`Error while fetching last inserted product -- ${err}`))
    return result
  }

module.exports = { findLastInsertedProduct }