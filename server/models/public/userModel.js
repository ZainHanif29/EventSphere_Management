import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    FirstName: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    Email: { type: String, required: true, trim: true },
    Password: { type: String, required: true, trim: true },
    Role: { type: String, enum: ['organizer', 'exhibitor', 'attendee'], default: 'attendee' },
},{ timestamps: true })

const UserModel = mongoose.model("User", userSchema)

export default UserModel;