const { v4: uuidv4 } = require('uuid');

const userDB= {
    user:require('../model/auth.json'),
    setUser:function(data){
        this.user = data
    }
}

const path = require('path')
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')

const handleNewUser = async(req,res)=>{
    const {username, password}  = req.body
    if(!username||!password){
        return res.status(400).json({'message':"Username and password required"})
    }
    const duplicate = userDB.user.find((item)=>item.username===username)
    if(duplicate){
        return res.status(409).json({'message':'User already logged in'})
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = {
            "id":uuidv4(),
            "username":username,
            "password":hashedPassword
        }
        userDB.setUser([...userDB.user,newUser])
        await fsPromises.writeFile(
            path.join(__dirname,"..","model","auth.json"),
            JSON.stringify(userDB.user)
        )
        res.status(201).json({'message':'New user found'})
    }catch(err){
        res.status(500).json({"message":"Internal Server Error"})
    }
}

module.exports={handleNewUser}