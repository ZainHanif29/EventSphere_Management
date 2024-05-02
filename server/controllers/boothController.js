import EventModel from "../models/EventModel.js";
import UserModel from "../models/userModel.js";
import BoothModel from "../models/boothModel.js"

class boothController {


    // Add Event
    static addBooth = async (req, res) => {
        const { boothName, boothDetail, city } = req.body;
        if (boothName && boothDetail && city) {
            try {
                const data = await EventModel.findById(req.user._id);
                const ID = data._id;
                const Name = data.FirstName + ' ' + data.LastName;
                const Email = data.Email;
                const Role = data.Role;
                if (Role == 'organizer') {
                    const doc = new EventModel({
                        boothName, boothDetail, city,
                        created_ID: ID, created_Name: Name, created_Email: Email, created_Role: Role
                    });
                    await doc.save();
                    res.json({ status: "success", message: "Add booth!  👍" })
                } else {
                    res.json({ status: "failed", message: `only organizer adding booth! 😊 ${e}` })
                }
            } catch (e) {
                res.json({ status: "failed", message: `No add booth! 😊 ${e}` })
            }
        } else {
            res.json({ status: "failed", message: "all field are required! 😊" })
        }
    }

    // Get Event
    static getBooth = async (req, res) => {
        try {
            const booth = await BoothModel.find();
            if (!booth || booth.length === 0) {
                return res.json({ status: "success", message: "No booth found! 😊" });
            }
            const data = await UserModel.findById(req.user._id);
            const role = data.Role;
            if (role == 'attendee') {
                return res.json({ status: "success", message: "attendee not allowed!" });
            }
            const showBooth = await BoothModel.find()
            res.json({ status: "success", message: showBooth });
        } catch (e) {
            res.json({ status: "failed", message: `Failed to fetch booth: ${e} 👎` });
        }
    }


}

export default boothController;