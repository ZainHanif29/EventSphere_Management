import mongoose from "mongoose";

// Expo Event Schema

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true, enum: ['Karachi', 'Lahore', 'Islamabad'], default: 'Karachi' },
    theme: { type: String, required: true, enum: ['Book Fair', 'Big Trade show', 'Expo'] },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    created_ID: { type: String },
    created_Name: { type: String },
    created_Email: { type: String },
    created_Role: { type: String },
});

const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;