const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuth = (req, res, next) => {
    const token = req.get('Authorization')
    // console.log(token)
    if(!token) {
        return res.status(403).json({msg:'Invalid Token supplied'})
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err) {
                return res.status(403).json({msg:'Invalid Token supplied'})
            } else {
                req.user = decodedToken.username
                next()
            }
        })
    }
    
}

module.exports = isAuth