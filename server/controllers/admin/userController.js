import UserModel from "../../models/public/userModel.js";



class userControllerAdmin {
    static getUser = async (req, res) => {
        const user = await UserModel.find();
        if (!user || user.length === 0) {
            return res.json({ status: "failed", message: "No user found! 😊" });
        }
        const data = await UserModel.findById(req.user._id);
        const role = data.Role;
        if (role == 'exhibitor' || role == 'attendee') {
            return res.json({ status: "failed", message: "Not allowed! 😊" });
        }
        if (role == 'organizer') {
            return res.json({ status: "success", message: user });
        }
    }

        // Delete User
        static deleteUser = async (req, res) => {
            try {
                const _id = req.params.userId;
                const user = await UserModel.findByIdAndDelete(_id);
                if (!user) {
                    return res.status(404).json({ status: "failed", message: "User not found! 😊" });
                }
                res.json({ status: "success", message: "user deleted successfully!  👍" });
            } catch (e) {
                res.status(500).json({ status: "failed", message: `Error deleting user: ${e.message} 👎` });
            }
        }
}

export default userControllerAdmin;