import express, { json } from 'express'
import user from '../model/user.json' assert { type: 'json' };
import path from 'path'
// import * as fsPromises from 'fs/promises'
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = {
    user,
    setData:function(datas){
        this.user =  datas
    }
}


const router = express.Router()
// logic can be seperated , write in middleware , 
// jwt authentication 
let arr = []
router.get('/',(req,res)=>{
    res.status(200).json({"data":data?.user})
})

router.post('/',(req,res)=>{
    const request = req.body
    const lastElem = data.user[data.user.length-1]
    let id  = data.user.length ? lastElem?.id +1 : 1
    let newUser= {
        ...request,
        id:id
    }
    data.setData([...data.user,newUser])
    fsPromises.writeFile(path.join(__dirname,'..','model',"user.json"),JSON.stringify(data?.user))
    res.status(201).json({"message":"user added"})
})

router.get('/:id',(req,res)=>{
    const {id} = req.params
    const filter = data?.user.find((item)=>item.id===parseInt(id))
    if(!filter) return res.status(400).json({"message":"No user found"})
    res.send(filter)
})

router.patch('/',(req,res)=>{
    const {name,id} = req.body
    if(!name || !id) return res.status(400).json({'message':'name or id missing'})
    const findId = data.user.find((item)=>item.id===parseInt(id))
    if(!findId) return res.status(400).json({"message":"No user found"})
    let updateUser ={...findId,name}
    const fil= data.user.filter((item)=>item.id!==parseInt(id))
    data.setData([...fil,updateUser])
    fsPromises.writeFile(path.join(__dirname,"..",'model','user.json'),JSON.stringify(data?.user))
    res.status(201).json({"message":'User updated'})
})

router.delete('/',(req,res)=>{
    const {id} = req.body
    const findId = data.user.find((item)=>item.id===parseInt(id))
    if(!findId){
        return res.status(400).json({"message":"no user found"})
    }

    const filterTheData = data.user.filter((item)=>item.id!==parseInt(id))
    data.setData(filterTheData)
    fsPromises.writeFile(path.join(__dirname,'..','model','user.json'),JSON.stringify(data.user))
    res.status(200).json({"message":"Deleted"})
})

export default router