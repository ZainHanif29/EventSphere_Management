import mongoose from "mongoose";

// Expo Event Schema

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true, enum: ['Karachi', 'Lahore', 'Islamabad'], default: 'Karachi' },
    theme: { type: String, required: true, enum: ['Book Fair', 'Big Trade show', 'Expo'] },
    description: { type: String, required: true },
    date:{type:Date,required: true},
    created_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{ timestamps: true });

const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;