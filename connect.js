const typeorm = require('typeorm')

const UserEntity = require('./model/User').UserEntity
const ProductEntity = require('./model/Product').ProductEntity

const dataSource = new typeorm.DataSource({
    type: "mariadb",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "productsapp",
    synchronize: true,
    entities: [UserEntity, ProductEntity]
})

dataSource
    .initialize()
    .then(function() {
        console.log("Connected to database")
    })
    .catch(function(error) {
        console.log("Problem while connecting to database ", error)
    })

    module.exports = {dataSource}