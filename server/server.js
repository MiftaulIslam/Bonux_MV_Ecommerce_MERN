const express = require('express')
const dotenv = require('dotenv')
const app = require('./app.js')
const ConnectMongo = require('./connection/dbConnection.js')


//handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})

//config
if(process.env.NODE_ENV !== 'production'){
    dotenv.config({
        path:'./config/.env'
    })
}


//Listing
const server = app.listen(process.env.SERVER_PORT || 4000, () => {
    console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`)
})



//Db Connection

ConnectMongo()

// Handling unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down due to unhandled promise rejection')
    server.close(() => {
        process.exit(1)
    })
})



//Handling warning 

process.on('warning',(warn)=>{
    console.log(`WARNING: ${warn.message}`)
    
})
