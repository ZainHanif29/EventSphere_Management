import mongoose from "mongoose";

const connectDB = async(dbURL,dbName)=>{
    try{
        await mongoose.connect(`${dbURL}/${dbName}`)
        console.log("'Successful' DB Connected !  👍")
    }catch(e){
        console.log("'Un Successful' DB not Connected !  👎")
    }
}

export default connectDB;