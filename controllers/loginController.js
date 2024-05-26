const userDB= {user:require('../model/auth.json'),
setUser:function(data){
    this.user = data
}
}


const bcrypt = require('bcrypt')


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
        res.status(200).json({'message':'yep Logged in'})
       }else{
        res.status(401).json({'message':'Password not match'})
       }

    // }catch(err){
        // res.status(500).json({'message':"Internal Server Error"})
    // }
}

module.exports ={login}