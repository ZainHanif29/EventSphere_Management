import EventModel from "../../models/admin/eventModel.js";

class eventControllerPublic{
        // Get Event for Client
        static getEventsClient = async (req, res) => {
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
}

export default eventControllerPublic;