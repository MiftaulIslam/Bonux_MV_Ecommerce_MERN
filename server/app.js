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
    origin: true,  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: "*", 
    credentials: true, 
  };
app.use(cors(corsOptions))

//Import Routes 
const authentication = require('./routes/auth/authentication')
const user = require('./routes/user')
const activation = require('./routes/auth/activation');
const category = require('./routes/category');
const product = require('./routes/product')
const seller = require('./routes/seller')
const store = require('./routes/store')
const upload = require('./utiles/multer');

//Routes 
app.use('/user', authentication)
app.use('/user', user)
app.use('/seller', seller)
app.use('/store', store)
app.use('/user',upload.none(), activation)
app.use('/category', category)
app.use('/product', product)


//error middleware
app.use(ErrorMiddleware)
module.exports = app;
