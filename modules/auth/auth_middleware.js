const jwt = require('jsonwebtoken')

const false_response = {
    auth: false,
    token: null,
    message: 'You are logged out'
}
// 16:08 in 60
const tokenize = (id) => {
    const { APP_SECRET, TOKEN_EXPIRE_SECONDS } = process.env;

    return jwt.sign( {id} , APP_SECRET, {
        expiresIn: parseInt(TOKEN_EXPIRE_SECONDS)
    })
}

const verify_token = async (req, res, next) => {
    try {

        //check header or url parameters or post parameters for token
        const token = req.headers['x-acces-token'];

        if (!token) return res.status(403).json({
            ...false_response,
            message: 'No token provided'
        });

        const { APP_SECRET } = process.env

        //verifies secret and cheks exp
        const decoded = await jwt.verify(token, APP_SECRET)

        //if everything is good, save to request for use in other routes. new key user_id
        req.user_id = decoded.id;
        next();
    } catch (error) {
        return res.status(404).send({
            ...false_response,
            message: 'Unauthorized - failed to authenticate token.'
        });
    }
}

module.exports = {
    verify_token,
    tokenize,
    false_response
};