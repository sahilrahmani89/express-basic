const path = require('path')
const fsPromises = require('fs').promises
const {format} = require('date-fns')
const {v4:uuidv4} = require('uuid')
const fs= require('fs')

const log = async(message,file)=>{
    const date = `${ format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${date}\t ${uuidv4()} \t ${message}\n`
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',file),logItem)
    }
    catch(err){
        console.log('err',err)
    }
}

const logMiddleWareCb = (req,res,next) =>{
    log(`${req.method}\t${req.headers.origin}\t${req.url}`,'log.txt')
    next()
}
module.exports = {log, logMiddleWareCb}