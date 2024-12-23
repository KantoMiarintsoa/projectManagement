import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/projectManagement"; 

const connectDB = mongoose.connect((uri))
    .then(res=>{
        console.log("connected to db");
    })
export { connectDB };  
