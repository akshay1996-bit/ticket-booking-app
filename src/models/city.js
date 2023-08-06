const sequelize = require('../configs/db').sequelize
const Datatypes = require('sequelize')

const City = sequelize.define('City',{
    id: {
        type: Datatypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    city: {
        type: Datatypes.STRING(255)
    }
},{
    timestamps: false
})

module.exports = City