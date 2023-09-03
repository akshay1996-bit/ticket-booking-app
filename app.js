const express = require('express')
const {connectToDb} = require('./src/configs/db')
const {connectToES} = require('./src/configs/elasticSearch')
const cityRoute = require('./src/routes/city')
const movieRouter = require('./src/routes/movies')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use('/city',cityRoute)
app.use('/movies',movieRouter)
app.use('/theater',theaterRouter)

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to book my show')
})

app.listen(process.env.PORT,async ()=>{
    console.log(`Server started on port ${process.env.PORT}`)
    await connectToDb()
    await connectToES()
})