const logger = require('../logger/logger');

const productEntity = require('../model/Product').ProductEntity
const dataSource = require('../connect').dataSource;

async function findLastInsertedProduct() {
    const result = await dataSource
    .getRepository(productEntity)
    .createQueryBuilder('prdct')
    // .select('product')
    // .from(productEntity, 'product')
    .orderBy('prdct.id', 'DESC')
    .getOne()
    .catch((err) => logger.debug(`Error while fetching last inserted product -- ${err}`))
    return result
  }

module.exports = { findLastInsertedProduct }