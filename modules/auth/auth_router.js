const asm = require('../../utils/async_middleware')
const bcrypt = require('bcrypt')
const express = require('express')
const path = require('path')
const p = require( '../../utils/color_logger')(path.basename(__filename));
const router = express.Router()

const user_model = require('../user/user.model')

const {
    tokenize,
    false_response,
    verify_token
} = require('../auth/auth_middleware')

router.use(express.json());
// 10:50 in recording 60
router.post('/register', asm( async (req,res) => {
// מקבלים את כל השדות
    p.dir('register, req.body:', req.body)
// במידה והכל בסדר עושים האשינג לסיסמא
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    const user_data = {
        ...req.body,
        password : hashedPassword
    }

    //create a user
    const hashPassword = await user_model.create(user_data)
    p.dir('register, created_user:', created_user)

    //create a token from user id
    const token = tokenize(created_user._id)

    return res.status(200).json({
        auth: true,
        token,
        user: create_user
    })

}))

router.post('/login', asm( async (req,res) => {
    //extract from req.bodythe credentials the user entered
    const {email, password} = req.body;

    // look for the user in db by email
    const user = await user_model.findOne({email})

    // if no user found...
    if(!user) return res.status(401).json(false_response)

    // check if the password is valid
    // create a fresh new token
    const password_id_valid = await bcrypt.compare(password, user.password)
    if(!password_id_valid) return res.status(401).json(false_response)

    // if user is gound and password is valid
    // create a fresh new token
    const token = tokenize(user._id)

    // return the information including token as jason
    return res.status(200).json({
        auth: true,
        token
    })
}))

router.get('/logout', asm( async (req, res) => {
    return res.status(200).json(false_response)
}))

// gets here only if the token is autonticated. going thru the middleware
router.get('/me', verify_token, asm( async (req,res) => {
    const user = await user_model.findById(req.user_id);
    if (!user) return res.status(404).json({message: 'No user found.'});
    res. status(200).json(user);
}))

module.exports = router;

