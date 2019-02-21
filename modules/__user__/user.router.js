/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
const asm = require('../../utils/async_middleware')
const express = require('express')

const path = require('path')
const p = require( '../../utils/color_logger')(path.basename(__filename))

const router = express.Router()


router.use(express.json())

const user_model = require('./user.model')

// CREATES A NEW USER
router.post('/', asm( async (req, res)=> {
    p.dir('create a user, req.body:', req.body)
    const user = await user_model.create(req.body)    
    res.status(200).json(user)       
}))

// GET ALL USERS
router.get('/', asm( async(req, res)=> {
    const users = await user_model.find({})
                                .select(`-_id 
                                        first_name 
                                        last_name 
                                        email
                                        phone`) 
                            //select only some of the fields 
                            // (don't include id and password...)

// #region select
// #endregion 

    res.status(200).json(users)
}))

// GETS A SINGLE USER
router.get('/:id', asm(async (req, res)=> {
    const user = await user_model.findById(req.params.id) 
                                .select(`-_id 
                                        first_name 
                                        last_name 
                                        email
                                        phone`) 
    if (!user) return res.status(404).send("No user found.")
    res.status(200).json(user)
}))

// DELETES A USER
router.delete('/:id', asm( async (req, res) => {
    const user = await user_model.findByIdAndRemove(req.params.id)
    res.status(200).json(user)
}))

// UPDATES A SINGLE USER
router.put('/:id', asm( async (req, res)=> {
    const user = await user_model.findByIdAndUpdate(req.params.id, 
                                                    req.body, 
                                                    {new: true,upsert:true})
    res.status(200).json(user)
}))


module.exports = router;