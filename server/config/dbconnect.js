import mongoose from "mongoose";

const connectDB = async(dbURL,dbName)=>{
    try{
        await mongoose.connect(`${dbURL}/${dbName}`)
        console.log("Database connected successfully 👍");
    }catch(e){
        console.error("Failed to connect to database 👎", error);
        process.exit(1); 
    }
}

export default connectDB;