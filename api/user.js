const express = require('express')
const router = express.Router()
const path = require('path')
const data = {}
data.user= require('../data/user.json')


router.route('/').get((req,res)=>{
    res.json(data.user)
}).post((req,res)=>{
    res.json({
        'name':req.body.name,
        'username':req.body.username
    })
})
.put((req,res)=>{
    res.json({
        'name':req.body.name,
        'username':req.body.username
    })
})
.delete((req,res)=>{
    res.json({'id':req.body.id})
})

router.route('/:id')
    .get((req,res)=>{
        res.json({
            "id":req.params.id,
            "name":req.params.name
        })
    })

module.exports = router