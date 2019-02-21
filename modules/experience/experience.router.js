/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
const asm = require('../../utils/async_middleware')
const express = require('express')

const path = require('path')
const p = require( '../../utils/color_logger')(path.basename(__filename))

const router = express.Router()


router.use(express.json())

const experience_model = require('./experience.model')

// CREATES A NEW EXPERIENCE
router.post('/', asm( async (req, res)=> {
    p.dir('create an experience, req.body:', req.body)
    const experience = await experience_model.create(req.body)    
    res.status(200).json(experience)       
}))

// GET ALL EXPERIENCES
router.get('/', asm( async(req, res)=> {
    const experiences = await experience_model.find()
                                // .select(`-_id 
                                //         first_name 
                                //         last_name 
                                //         email
                                //         phone`) 
                            //select only some of the fields 
                            // (don't include id and password...)

// #region select
// #endregion 

    res.status(200).json(experiences)
}))

// GETS A SINGLE EXPERIENCE
router.get('/:id', asm(async (req, res)=> {
    const experience = await experience_model.findById(req.params.id) 
                                // .select(`-_id 
                                //         first_name 
                                //         last_name 
                                //         email
                                //         phone`) 
    if (!experience) return res.status(404).send("No experience found.")
    res.status(200).json(experience)
}))

// DELETES A EXPERIENCE
router.delete('/:id', asm( async (req, res) => {
    const experience = await experience_model.findByIdAndRemove(req.params.id)
    res.status(200).json(experience)
}))

// UPDATES A SINGLE EXPERIENCE
router.put('/:id', asm( async (req, res)=> {
    const experience = await experience_model.findByIdAndUpdate(req.params.id, 
                                                    req.body, 
                                                    {new: true,upsert:true})
    res.status(200).json(experience)
}))


module.exports = router;