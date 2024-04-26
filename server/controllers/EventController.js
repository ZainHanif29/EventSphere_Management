import EventModel from "../models/EventModel.js";
import UserModel from "../models/userModel.js";

class eventController {


    // Add Event
    static addEvent = async (req, res) => {
        const { title, theme, date, time, location, description } = req.body;
        if (title && theme && date && time && description) {

            try {
                const data = await UserModel.findById(req.user._id);
                const ID = data._id;
                const Name = data.FirstName + data.LastName;
                const Email = data.Email;
                const Role = data.Role;

                const doc = new EventModel({
                    title, theme, date, time, location, description,
                    created_ID: ID, created_Name: Name, created_Email: Email, created_Role: Role
                });
                await doc.save();
                res.json({ status: "success", message: "Add Event!  👍" })
            } catch (e) {
                res.json({ status: "failed", message: `No add event! 😊 ${e}` })
            }

        } else {
            res.json({ status: "failed", message: "all field are required! 😊" })
        }
    }

    // Get Event
    static getEvents = async (req, res) => {
        try {
            const events = await EventModel.find();
            if (!events || events.length === 0) {
                return res.json({ status: "success", message: "No events found! 😊" });
            }
            res.json({ status: "success", message: events });
        } catch (e) {
            res.json({ status: "failed", message: `Failed to fetch events: ${e} 👎` });
        }
    }

    // Update Event
    static updateEvent = async (req, res) => {
        const { eventId } = req.params;  
        const updateData = req.body;  

        try {
            const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updateData, { new: true, runValidators: true });

            if (!updatedEvent) {
                return res.status(404).json({ status: "failed", message: "Event not found! 😊" });
            }

            res.json({ status: "success", message: "Event updated successfully", data: updatedEvent });
        } catch (e) {
            res.status(500).json({ status: "failed", message: `Error updating event: ${e.message} 👎` });
        }
    }

        // Delete Event
        static deleteEvent = async (req, res) => {
            try {
                const _id = req.params.eventId; 
                console.log(_id)
                const event = await EventModel.findByIdAndDelete(_id);
    
                if (!event) {
                    return res.status(404).json({ status: "failed", message: "Event not found! 😊" });  
                }
    
                res.json({ status: "success", message: "Event deleted successfully!  👍" });  
            } catch (e) {
                res.status(500).json({ status: "failed", message: `Error deleting event: ${e.message} 👎` });
            }
        }

    

}

export default eventController