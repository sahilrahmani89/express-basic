const data = {
    user:require('./../model/user.json'),
    setData: function(data){this.user = data}
}


const getUser = (req,res)=>{
    res.json(data.user)
}


const postUser = (req,res) =>{
    const user= {
        id: data?.user?.length ? data?.user[data?.user.length -1 ].id+1 :1,
        'name':req.body.name,
        'username':req.body.username
    }
    if(!user?.name || !user?.name){
        return res.status(400).json({message:'Not Allowed :)'})
    }
    data?.setData([...data?.user, user])
    res.status(201).json(data?.user)
}

const updateUser = (req,res) =>{
    const userId = data?.user.find((item)=>item.id===parseInt(req.body.id))
    if(!userId){
        res.status(400).json({message:`${req.params.id} Not found`})
    }
    if(req.body.name) {userId.name = req.body?.name}
    if(req?.body?.username) {userId.username = req?.body?.username}

    const removeUpdated = data?.user.filter((item)=>item.id!==parseInt(req.body.id))
    const arr = [...removeUpdated,userId]
    data.setData(arr.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data?.user)
}


const deleteUser = (req,res) =>{
    const userId = data?.user.find((item)=>item.id===parseInt(req.body.id))
    if(!userId){
        res.status(400).json({message:`${req.params.id} Not found`})
    }
    const filterId = data?.user.filter((item)=>item.id!==parseInt(req.body.id))
    data?.setData([...filterId])
    res.json(data?.user)
}

const getUserByParam = (req,res) =>{
    const userId = data?.user.find((item)=>item.id===parseInt(req.params.id))
    if(!userId){
        res.status(400).json({message:`${req.params.id} Not found`})
    }

    res.json(userId)
}

module.exports = {
    getUser,
    postUser,
    updateUser,
    deleteUser,
    getUserByParam
}