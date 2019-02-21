/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
const asm = require('../../utils/async_middleware')
const express = require('express')

const path = require('path')
const p = require( '../../utils/color_logger')(path.basename(__filename))

const router = express.Router()


router.use(express.json())

const comment_model = require('./comment.model')

// CREATES A NEW comment
router.post('/', asm( async (req, res)=> {
    p.dir('create an comment, req.body:', req.body)
    const comment = await comment_model.create(req.body)    
    res.status(200).json(comment)       
}))

// GET ALL CITIES
router.get('/', asm( async(req, res)=> {
    const comments = await comment_model.find()
                                // .select(`-_id 
                                //         first_name 
                                //         last_name 
                                //         email
                                //         phone`) 
                            //select only some of the fields 
                            // (don't include id and password...)

// #region select
// #endregion 

    res.status(200).json(comments)
}))

// GETS A SINGLE comment
router.get('/:id', asm(async (req, res)=> {
    const comment = await comment_model.findById(req.params.id) 
                                // .select(`-_id 
                                //         first_name 
                                //         last_name 
                                //         email
                                //         phone`) 
    if (!comment) return res.status(404).send("No comment found.")
    res.status(200).json(comment)
}))

// DELETES A comment
router.delete('/:id', asm( async (req, res) => {
    const comment = await comment_model.findByIdAndRemove(req.params.id)
    res.status(200).json(comment)
}))

// UPDATES A SINGLE comment
router.put('/:id', asm( async (req, res)=> {
    const comment = await comment_model.findByIdAndUpdate(req.params.id, 
                                                    req.body, 
                                                    {new: true,upsert:true})
    res.status(200).json(comment)
}))


module.exports = router;