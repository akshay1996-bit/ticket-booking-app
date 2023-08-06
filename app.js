const express = require('express')
const {connectToDb} = require('./src/configs/db')
const cityRoute = require('./src/routes/city')
const movieRouter = require('./src/routes/movies')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use('/city',cityRoute)
app.use('/movies',movieRouter)

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to book my show')
})

app.listen(process.env.PORT,async ()=>{
    console.log(`Server started on port ${process.env.PORT}`)
    await connectToDb()
})