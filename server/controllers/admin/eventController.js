import EventModel from "../../models/admin/eventModel.js";
import UserModel from "../../models/public/userModel.js";

class eventController {
    static addEvent = async (req, res) => {
        const { title, theme, location, description, date } = req.body;
        if (!title || !theme || !description || !date) {
            return res.json({ status: "failed", message: "All fields are required! 😊" });
        }

        try {
            const data = await UserModel.findById(req.user._id);
            const { _id: created_ID, Role } = data;

            if (Role === 'exhibitor' || Role === 'organizer') {
                const event = new EventModel({ title, theme, location, description, date, created_ID });
                await event.save();
                return res.json({ status: "success", message: "Event added successfully!  👍" });
            } else {
                return res.json({ status: "failed", message: "Attendee not allowed!" });
            }
        } catch (error) {
            return res.json({ status: "failed", message: `Failed to add event: ${error}` });
        }
    }

    static getEvents = async (req, res) => {
        try {
            const events = await EventModel.find();
            const { Role } = await UserModel.findById(req.user._id);

            if (Role === 'exhibitor') {
                return res.json({ status: "success", message: await EventModel.find({ created_Role: 'exhibitor' }) });
            } else if (Role === 'organizer') {
                return res.json({ status: "success", message: events });
            } else {
                return res.json({ status: "failed", message: "Attendee not allowed!" });
            }
        } catch (error) {
            return res.json({ status: "failed", message: `Failed to fetch events: ${error}` });
        }
    }
    static getEventsbyID = async (req, res) => {
        try {
            const eventId = req.params.eventId;
            const event = await EventModel.findById(eventId);
            if (!event) {
                return res.status(404).json({ status: "failed", message: "Event not found" });
            }
            res.json({ status: "success", message: event });
        } catch (error) {
            console.error("Error fetching event details:", error);
            res.status(500).json({ status: "failed", message: "Failed to fetch event details" });
        }
    }

    static updateEvent = async (req, res) => {
        const { eventId } = req.params;
        const updateData = req.body;

        try {
            const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updateData, { new: true, runValidators: true });
            if (!updatedEvent) {
                return res.status(404).json({ status: "failed", message: "Event not found! 😊" });
            }
            res.json({ status: "success", message: "Event updated successfully", data: updatedEvent });
        } catch (error) {
            res.status(500).json({ status: "failed", message: `Error updating event: ${error.message} 👎` });
        }
    }

    static deleteEvent = async (req, res) => {
        try {
            const { eventId } = req.params;
            const event = await EventModel.findByIdAndDelete(eventId);
            if (!event) {
                return res.status(404).json({ status: "failed", message: "Event not found! 😊" });
            }
            res.json({ status: "success", message: "Event deleted successfully!  👍" });
        } catch (error) {
            res.status(500).json({ status: "failed", message: `Error deleting event: ${error.message} 👎` });
        }
    }
}

export default eventController;