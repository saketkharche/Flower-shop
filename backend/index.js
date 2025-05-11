const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;


connectToMongo();

app.get('/',(req,res)=>{
    res.send('Hey node n express, Flower App!');
})

//middleware to allow json
app.use(express.json());
app.use(cors());

//Available Routes
app.use('/auth',require('./routes/auth'))
app.use('/products',require('./routes/products'))
app.use('/cart',require('./routes/cart'))
app.use('/order',require('./routes/order'))


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})