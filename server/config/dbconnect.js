import mongoose from "mongoose";

const connectDB = async(dbURL,dbName)=>{
    try{
        await mongoose.connect(`${dbURL}/${dbName}`)
        console.log("'Scccessful' DB Connected !  👍")
    }catch(e){
        console.log("'Un Scccessful' DB not Connected !  👎")
    }
}

export default connectDB;