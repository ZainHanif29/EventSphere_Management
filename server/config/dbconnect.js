import mongoose from "mongoose";

const connectDB = async(dbURL)=>{
    try{
        await mongoose.connect(`${dbURL}`)
        console.log("Database connected successfully 👍");
    }catch(e){
        console.error("Failed to connect to database 👎", e);
        process.exit(1); 
    }
}

export default connectDB;