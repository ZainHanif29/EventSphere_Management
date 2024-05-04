import UserModel from "../../models/public/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../../config/mail.js";
import dotenv from 'dotenv'
dotenv.config()


class userControllerAdmin {
    static getUser = async (req, res) => {
        const user = await UserModel.find();
        if (!user || user.length === 0) {
            return res.json({ status: "success", message: "No user found! 😊" });
        }
        const data = await UserModel.findById(req.user._id);
        const role = data.Role;
        if (role == 'exhibitor' || role == 'attendee') {
            return res.json({ status: "success", message: "Not allowed! 😊" });
        }
        if (role == 'organizer') {
            return res.json({ status: "success", message: user });
        }
    }
}

export default userControllerAdmin;