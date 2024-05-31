import express from 'express'
import bodyparse from 'body-parser'
import userRouter from './router/userData.js'

const app = express()
const PORT = 4000
app.use(bodyparse.json())

app.use('/user',userRouter)

app.get('/',(req,res)=>{
    res.send('Hello There!')
})

app.listen(PORT,()=>console.log('Server running '))