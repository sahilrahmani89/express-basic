const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT= (req,res,next)=>{
    const header = req.headers['authorization']
    if(!header){
        res.send(401)
    }
    const token = header.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err)return res.status(401)
                req.user= decoded.username
                next()
        }
    )
}

module.exports = verifyJWT