const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'bookmyshow',
    'root',
    'password',{
        dialect: 'mysql',
        host: 'localhost',
        pool:{
            min: 0,
            max: 5,
            idle: 10000
        }
    }
)

const connectToDb = async () => {
    try{
        await sequelize.authenticate()
        console.log('Successfully connected to DB')
    }catch(err){
        console.log(err)
    }
}

module.exports = {sequelize,connectToDb}