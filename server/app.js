const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const ErrorMiddleware = require('./middlewares/error')


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV !== 'production'){
    dotenv.config({
        path:'./config/.env'
    })
}
//Enable Cors
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
  };
app.use(cors(corsOptions))

//Import Routes 
const authentication = require('./routes/auth/authentication')
const activation = require('./routes/auth/activation');
const category = require('./routes/category');
const product = require('./routes/product')
const seller = require('./routes/seller')
const upload = require('./utiles/multer');

//Routes 
app.use('/user', authentication)
app.use('/seller', seller)
app.use('/user',upload.none(), activation)
app.use('/category', category)
app.use('/product', product)


//error middleware
app.use(ErrorMiddleware)
module.exports = app;