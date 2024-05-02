import mongoose from "mongoose";

// Expo Event Booth Schema

const boothSchema = new mongoose.Schema({
    boothName: { type: Number, required: true},
    boothDetail: { type: String, required: true },
    city: { type: String, required: true, enum: ['Karachi', 'Lahore', 'Islamabad'], default: 'Karachi'},
    created_at: { type: Date, default: Date.now },
    created_ID: { type: String },
    created_Name: { type: String },
    created_Email: { type: String },
    created_Role: { type: String },
});

const BoothModel = mongoose.model('Booth', boothSchema);

export default BoothModel;