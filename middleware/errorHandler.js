const {log} = require('./logEvents')
const errorHandler = (err,req,res,next) =>{
    log(`${err.name} ${err.message}`,'errlog.txt')
    res.status(500).send(err.message)
}

module.exports = errorHandler