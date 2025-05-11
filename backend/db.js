const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/flower';

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log('connection established suessfully');
    })
}

module.exports = connectToMongo;