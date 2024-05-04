import mongoose from "mongoose";

// Expo Event Rigester Schema

const eventSchema = new mongoose.Schema({
    created_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    EventRigesterID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    BoothID: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth', required: true },
    StartTime:{type:Date},
    EndTime:{type:Date},
    Status: { type: String, required: true, enum: ['Aprove', 'Reject', 'Reserve'], default: 'Reserve' },
    created_at: { type: Date, default: Date.now },

}, { timestamps: true }
);

const RigesterEventModel = mongoose.model('Event-Rigester', eventSchema);

export default RigesterEventModel;