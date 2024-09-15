const mongoose = require('mongoose');
function ConnectMongo(){
     mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
}).then(()=> console.log('Connection Successful')).catch((err) => console.log(err));
}
module.exports = ConnectMongo;