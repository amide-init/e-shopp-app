const express =  require('express');

const app =  express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = process.env.port || 8080;
const prodcutRoute = require('./routes/product-route')
const userRoute = require('./routes/user-route')
const cors = require('cors');
mongoose.connect(
    "mongodb+srv://amide:root@livecode.cg0h9.mongodb.net/batchData",
    (err) =>{
        if(err) {
            console.log("Db connection issue", err)
        }else {
            console.log("Db is connected")
        }
    }
)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use('/product', prodcutRoute)
app.use('/user', userRoute)
app.listen(port, () => {
    console.log("server is connect:" , port)
})


// mongodb+srv://amide:<password>@livecode.cg0h9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority