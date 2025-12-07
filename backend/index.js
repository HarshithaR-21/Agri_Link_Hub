const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');  

//Database Connection

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("MongoDB connection failed:", err.message);
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes import
//const userRoute = require('./routes/user');
const farmerRoute = require('./routes/farmer');

//api calls
app.use('/api/farmer', farmerRoute);
//app.use('/api/user', userRoute);

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Backend server is running");
});