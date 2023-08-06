const sequelize = require('../configs/db').sequelize
const Datatypes = require('sequelize')

const Movie = sequelize.define('Movie',{
    id: {
        type: Datatypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Datatypes.STRING(255),
        allowNull: false
    },
    fromDate: {
        type: Datatypes.STRING(255)
    },
    toDate: {
        type: Datatypes.STRING(255)
    },
    description: {
        type: Datatypes.STRING(255)
    },
    runTime:{
        type: Datatypes.STRING(255)
    }
},{
    timestamps: false
})

module.exports = Movie