import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const Connection  = async()=>{
    const URL=process.env.DB_URL;
    try {
        //since moongse.connect is a function which return a promise thats why we have used async await


       await mongoose.connect(URL,{ useNewUrlParser:true});
       console.log("Database connected succesfully");
        
    } catch (error) {
        
        console.log("Error while connecting",error);
        
    }
}

export default Connection;
