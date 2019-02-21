/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
const asm = require('../../utils/async_middleware')
const express = require('express')

const path = require('path')
const p = require( '../../utils/color_logger')(path.basename(__filename))

const router = express.Router()


router.use(express.json())

const city_model = require('./city.model')

// CREATES A NEW CITY
router.post('/', asm( async (req, res)=> {
    p.dir('create an city, req.body:', req.body)
    const city = await city_model.create(req.body)    
    res.status(200).json(city)       
}))

// GET ALL CITIES
router.get('/', asm( async(req, res)=> {
    const cities = await city_model.find()
                                // .select(`-_id 
                                //         first_name 
                                //         last_name 
                                //         email
                                //         phone`) 
                            //select only some of the fields 
                            // (don't include id and password...)

// #region select
// #endregion 

    res.status(200).json(cities)
}))

// GETS A SINGLE CITY
router.get('/:id', asm(async (req, res)=> {
    const city = await city_model.findById(req.params.id) 
                                // .select(`-_id 
                                //         first_name 
                                //         last_name 
                                //         email
                                //         phone`) 
    if (!city) return res.status(404).send("No city found.")
    res.status(200).json(city)
}))

// DELETES A CITY
router.delete('/:id', asm( async (req, res) => {
    const city = await city_model.findByIdAndRemove(req.params.id)
    res.status(200).json(city)
}))

// UPDATES A SINGLE CITY
router.put('/:id', asm( async (req, res)=> {
    const city = await city_model.findByIdAndUpdate(req.params.id, 
                                                    req.body, 
                                                    {new: true,upsert:true})
    res.status(200).json(city)
}))


module.exports = router;