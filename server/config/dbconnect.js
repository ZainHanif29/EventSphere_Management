import mongoose from "mongoose";

const connectDB = async(dbURL,dbName)=>{
    try{
        await mongoose.connect(`${dbURL}/${dbName}`)
        console.log("dbconnect 12 line 'success'")
    }catch(e){
        console.log("dbconnect 14 line 'catch'");
    }
}

export default connectDB;