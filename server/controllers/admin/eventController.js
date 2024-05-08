import EventModel from "../../models/admin/eventModel.js";
import UserModel from "../../models/public/userModel.js";

class eventController {

    // Add Event
    static addEvent = async (req, res) => {
        const { title, theme, location, description ,date} = req.body;
        if (title && theme && description && date) {
            try {
                const data = await UserModel.findById(req.user._id);
                const ID = data._id;
                // const Name = data.FirstName + ' ' + data.LastName;
                // const Email = data.Email;
                const Role = data.Role;
                console.log(Role)
                if (Role == 'exhibitor' || Role == 'organizer') {
                    const doc = new EventModel({
                        title, theme,location, description,date,created_ID: ID
                        // created_ID: ID, created_Name: Name, created_Email: Email, created_Role: Role
                    });
                    await doc.save();
                    res.json({ status: "success", message: "Add Event!  👍" })
                }
                if (Role == 'attendee') {
                    res.json({ status: "failed", message: "attendee not allowed!" });
                }
            } catch (e) {
                res.json({ status: "failed", message: `No add event! 😊 ${e}` })
            }
        } else {
            res.json({ status: "failed", message: "all field are required! 😊" })
        }
    }

    // Get Event for Dashboard
    static getEvents = async (req, res) => {
        try {
            const events = await EventModel.find();
            if (!events || events.length === 0) {
                return res.json({ status: "success", message: "No events found! 😊" });
            }
            const data = await UserModel.findById(req.user._id);
            const role = data.Role;
            if(role == 'exhibitor'){
                const ev = await EventModel.find({created_Role:'exhibitor'})
                return res.json({ status: "success", message: ev });
            }
            if(role == 'organizer'){
                const ev = await EventModel.find()
                return res.json({ status: "success", message: ev });
            }
            if(role == 'attendee'){
                return res.json({ status: "failed", message: "attendee not allowed!" });
            }
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

export default eventController;