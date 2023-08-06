const express = require('express')
const router = express.Router()
const City = require('../models/city')

router.get('/',async (req,res)=>{
    const cities = await City.findAll()
    res.status(200).send(cities)
})

module.exports =router