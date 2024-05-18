const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','some-page','nested','index.html'))
})
// custom middleware to to get page which is in subfolder 
// route is some-page

module.exports = router