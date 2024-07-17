require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./DataBase/connection')
const HealthcheckRouter = require('./Routes/healthcheck.routers')
const app = express()
const {connect} = require('mongoose')
const BookRouter = require('./Routes/books.router')
// app.use(express.static()) Static files to be serverd here!
app.use(express.json())
app.use(bodyParser.json())


//All the main routers 
app.use('/',HealthcheckRouter)
app.use('/api/v1/library',BookRouter)



const port = process.env.PORT ||5000



//Const DataBase Connection Functionaltiy


const Connectdb = async ()=>{
   try {
  await connectDB(process.env.MONGO_URI)
  console.log('Connected to the database successfully!')
  app.listen(port,()=>{
    console.log('Server is listining on port:',port)
  })
   } catch (error) {
    console.log(error)
   }
}



Connectdb()