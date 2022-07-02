const express = require('express');
const app = express();
require('dotenv').config()
const userRouter = require('./Routes/user.route')
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/', userRouter)
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is listen on port ${PORT}`);
})