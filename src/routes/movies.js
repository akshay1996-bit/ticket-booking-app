const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')

router.get('/',async (req,res)=>{
    const Movies = await Movie.findAll()
    res.status(200).send(Movies)
})

module.exports = router