import mongoose from "mongoose";
import colors from "colors";

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to database: ${conn.connection.host}`.bgMagenta);
    } catch(error){
        console.log(`Error in Mongodb: ${error}`.bgRed);
    }
}

export default connectDB;