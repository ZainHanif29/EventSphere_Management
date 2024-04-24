import EventModel from "../models/EventModel.js";
import UserModel from "../models/userModel.js";

class eventController {


    // Add Event
    static addEvent = async (req, res) => {
        const { title, theme, date, time, location, description } = req.body;
        if (title && theme && date && time && description) {

            try {
                const user = await UserModel.findById(req.user._id);
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

}

export default eventController