import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/mail.js";
import dotenv from 'dotenv'
dotenv.config()

class userController {



    // Rigester Controller
    static userRigester = async (req, res) => {
        const { FirstName, LastName, Email, Password,Role } = req.body;
        if (FirstName && LastName && Email && Password ) {
            const user = await UserModel.findOne({ Email: Email });
            if (user) {
                res.json({ status: 'failed', message: 'user already exit!  😊' })
            } else {
                try {
                    const hashPassword = await bcrypt.hash(Password, 10)
                    const doc = new UserModel({
                        FirstName, LastName, Email, Password: hashPassword, Role
                    });
                    await doc.save();
                    // Generate JWT Token
                    const token = jwt.sign({ userID: doc._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXP })

                    res.json({ status: 'success', message: "user rigester!  👍", 'token': token })

                } catch (error) {
                    res.json({ status: 'failed', message: `user not rigester!  👎  ${error}` })
                }
            }
        } else {
            res.json({ status: 'failed', message: 'all filed are required!  😊 ' })
        }
    }

    // Login Controller
    static userLogin = async (req, res) => {
        const { Email, Password } = req.body;
        if (Email && Password) {
            const user = await UserModel.findOne({ Email: Email });
            if (user) {
                const password = await bcrypt.compare(Password, user.Password);
                if ((Email === user.Email) && password) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXP })
                    res.json({ status: "success", message: "login successfully! 👍", 'token': token })
                } else {
                    res.json({ status: "failed", message: "email or password is not valid!  😢" })
                }
            } else {
                res.json({ status: "failed", message: "user not rigester!  😊" })
            }
        } else {
            res.json({ status: "failed", message: "all field are required!  😊" })
        }
    }

    // Change Password
    static changePassword = async (req, res) => {
        const { Password, PasswordConfirm } = req.body
        if (Password && PasswordConfirm) {
            if (Password !== PasswordConfirm) {
                res.json({ status: "failed", message: "password and confirm password doesn't match!  😢" })
            } else {
                const hashPassword = await bcrypt.hash(Password, 10)
                await UserModel.findByIdAndUpdate(req.user._id, { $set: { Password: hashPassword } })
                res.json({ status: "success", message: "password changed succesfully!  👍" })
            }
        } else {
            res.json({ status: "failed", message: "all fields are required" })
        }
    }

    // Logged User
    static loggedUser = async (req, res) => {
        res.json({ user: req.user })
    }

    // Reset Email
    static sendUserEmailResetPassword = async (req, res) => {
        const { Email } = req.body
        if (Email) {
            const user = await UserModel.findOne({ Email: Email })
            if (user) {
                const secret = user._id + process.env.JWT_TOKEN
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
                const link = `http://127.0.0.1:3000/api/reset/${user._id}/${token}`

                //  Send Email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.Email,
                    subject: "EventSphere - Password Reset Link",
                    html: `<center><button href=${link}>Reset Password</button></center>`
                })
                res.json({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
            } else {
                res.json({ "status": "failed", "message": "Email doesn't exists" })
            }
        } else {
            res.json({ "status": "failed", "message": "Email Field is Required" })
        }
    }

}

export default userController