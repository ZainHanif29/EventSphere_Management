import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

class userController {
    static userRigester = async (req, res) => {
        const { FirstName, LastName, Email, Phone, Password, PasswordConfirm} = req.body;
        const user = await UserModel.findOne({ Email: Email });
        if (user) {
            res.json({ status: 'failed', message: 'user already exit' })
        } else {
            if (FirstName && LastName && Email && Phone && Password && PasswordConfirm) {
                if (Password === PasswordConfirm) {
                    try {
                        const hashPassword = await bcrypt.hash(Password, 10)
                        const doc = new UserModel({
                            FirstName,LastName,Email,Phone,Password:hashPassword
                        })
                        await doc.save();

                        res.json({ status: 'success', message: "User Rigester!!! 👍" })

                    } catch (error) {
                        res.json({ status: 'failed', message: "User Not Rigester!!! 😢" })
                    }
                } else {
                    res.json({ status: 'failed', message: "password and confirm password doesn't match" })
                }
            } else {
                res.json({ status: 'failed', message: 'all filed are required' })
            }
        }
    }
}

export default userController