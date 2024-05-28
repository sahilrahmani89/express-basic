const userDB= {user:require('../model/auth.json'),
setUser:function(data){
    this.user = data
}
}


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const fsPromises = require('fs').promises
require('dotenv').config()

const login=async(req,res) =>{
    const {username,password} = req.body
    if(!username||!password){
        return res.status(400).json({'message':"Username and password required"})
    }
    const isUser = userDB?.user?.find((item)=>item.username === username)
    if(!isUser){
        return res.status(401).json({'message':'Unauthorize login'})
    }
    // try{
       const passwordCheck = await bcrypt.compare(password,isUser.password)
       if(passwordCheck){
        const accessToken =  jwt.sign(
            {"username":isUser?.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
        )
        const refreshToken =  jwt.sign(
            {"username":isUser?.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'2d'}
        )
        const notCurrentUser = userDB?.user.filter((item)=>item.username!==isUser?.username)
        const currentUser = {...isUser,refreshToken}
        userDB.setUser([...notCurrentUser,currentUser])
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','auth.json'),
            JSON.stringify(userDB.user)
        )
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000})
        res.status(200).json({accessToken})
       }else{
        res.status(401).json({'message':'Password not match'})
       }

    // }catch(err){
        // res.status(500).json({'message':"Internal Server Error"})
    // }
}

module.exports ={login}