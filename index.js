const cors = require('cors')
const express = require('express')
const bp = require('body-parser')

//Taking particular part of that package
const {
  connect
} = require('mongoose')
const {
  success,
  error
} = require('consola')

//Bring in the app constants
//It will automatically gets from index.js
const {
  DB,
  PORT
} = require('./config/index.js')
//Initialize the application
const app = express()

// ------------------------ MIDDLEWARES -------------------------------

app.use(cors())
app.use(bp.json())

// ------------------------ USING ROUTES MIDDLEWARES ------------------

app.use('/api/users', require('./routes/users'))

// ------------------------ STARTING THE APP --------------------------

const startApp = async () => {
  try {

    //connnecting the DB 
    await connect(DB, {
      userFindAndModify: true,
      userUnifiedTopology: true,
      useNewUrlParser: true
    })

    success({
      message: `Successfully connected to DB \n ${DB}`,
      badge: true
    })

    //Listening to teh server
    app.listen(PORT, () => {
      success({
        message: `Server started on port ${PORT}`,
        badge: true
      })
    })

  } catch (err) {
    error({
      message: `Unable to connect to DB \n ${err}`,
      badge: true
    })
    startApp()
  }
}

startApp()
