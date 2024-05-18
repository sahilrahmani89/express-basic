const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 4000;
const {logMiddleWareCb} = require('../middleware/logEvents')
const cors = require('cors')
const errorHandler = require('../middleware/errorHandler')




app.use(logMiddleWareCb) // custom middleware

// use cors after middleware to resolve
const mySite = ['http://localhost:4000','http://127.0.0.1:4000']
const corsOption = {
    origin:(origin,callback)=>{
        if(mySite.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Cors error'))

        }
    }
}

// built in middle ware 
app.use(express.urlencoded({extended:false})) // to handle urlencoded

// built in middleware for json
app.use(express.json());

//static file
app.use(express.static(path.join(__dirname,'..','/public')))


app.use('/somepage',require('./../routes/routes'))
// above is one for to sub folder  where  use route middleware 
//// api route
app.use('/api/user',require('./../api/user'))
/// api route
app.get('^/$|/index(.html)?',(req,res)=>{
    // res.send('hello there!')
    res.sendFile(path.join(__dirname,'..','pages','index.html'))
})
app.get('/old-index(.html)?',(req,res)=>{
    res.redirect(301,'/about.html')
})
app.get('/about(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','pages','about.html'))
})
app.use(errorHandler)

// make cors option at bottom , means after request handled for calling page
app.use(cors(corsOption))
app.listen(PORT,()=>console.log('server is running '+PORT))