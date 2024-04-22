import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/mail.js";
import dotenv from 'dotenv'
dotenv.config()

class userController {

    // Rigester
    static userRigester = async (req, res) => {
        const { FirstName, LastName, Email, Phone, Password } = req.body;
        const user = await UserModel.findOne({ Email: Email });
        if (user) {
            res.json({ status: 'failed', message: 'user already exit' })
        } else {
            if (FirstName && LastName && Email && Phone && Password) {
                if (Password) {
                    try {
                        const hashPassword = await bcrypt.hash(Password, 10)
                        const doc = new UserModel({
                            FirstName, LastName, Email, Phone, Password: hashPassword
                        })
                        await doc.save();

                        // Generate JWT Token
                        const token = jwt.sign({ userID: doc._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXP })

                        res.json({ status: 'success', message: "User Rigester!!! 👍", 'token': token })

                    } catch (error) {
                        res.json({ status: 'failed', message: `User Not Rigester!!! 😢  ${error}` })
                    }
                } else {
                    res.json({ status: 'failed', message: "password and confirm password doesn't match" })
                }
            } else {
                res.json({ status: 'failed', message: 'all filed are required' })
            }
        }
    }

    // Login
    static userLogin = async (req, res) => {
        const { Email, Password } = req.body;
        if (Email && Password) {
            const user = await UserModel.findOne({ Email: Email });
            if (user) {
                const password = await bcrypt.compare(Password, user.Password);
                if ((Email === user.Email) && password) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXP })
                    res.json({ status: "success", message: "login successfully!!! 👍", 'token': token })
                } else {
                    res.json({ status: "failed", message: "Email or Password is not valid! 😢" })
                }
            } else {
                res.json({ status: "failed", message: "User not Rigester  😒" })
            }
        } else {
            res.json({ status: "failed", message: "all field are required  😒" })

        }

    }

    // Change Password
    static changeUserPassword = async (req, res) => {
        const { Password, PasswordConfirm } = req.body
        if (Password && PasswordConfirm) {
            if (Password !== PasswordConfirm) {
                res.json({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
            } else {
                const newHashPassword = await bcrypt.hash(Password, 10)
                await UserModel.findByIdAndUpdate(req.user._id, { $set: { Password: newHashPassword } })
                res.json({ "status": "success", "message": "Password changed succesfully" })
            }
        } else {
            res.json({ "status": "failed", "message": "All Fields are Required" })
        }
    }

    // Logged User
    static loggedUser = async (req, res) => {
        res.json({ 'user': req.user })
    }

    // Reset Email
    static sendUserPasswordResetEmail = async (req, res) => {
        const { Email } = req.body
        if (Email) {
            const user = await UserModel.findOne({ Email: Email })
            if (user) {
                const secret = user._id + process.env.JWT_TOKEN
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
                const link = `http://127.0.0.1:3000/api/reset/${user._id}/${token}`
                console.log(link)

                //  Send Email
                // let info = await transporter.sendMail({
                //     from: process.env.EMAIL_FROM,
                //     to: user.Email,
                //     subject: "EventSphere - Password Reset Link",
                //     html: `<a href=${link}>Click Here</a> to Reset Your Password`
                // })

                res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
            } else {
                res.send({ "status": "failed", "message": "Email doesn't exists" })
            }
        } else {
            res.send({ "status": "failed", "message": "Email Field is Required" })
        }
    }

    static userPasswordReset = async (req, res) => {
        const { Password, Password_confirmation } = req.body
        const { id, token } = req.params
        const user = await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_TOKEN
        try {
            jwt.verify(token, new_secret)
            if (Password && Password_confirmation) {
                if (Password !== Password_confirmation) {
                    res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
                } else {
                    const newHashPassword = await bcrypt.hash(Password, 10)
                    await UserModel.findByIdAndUpdate(user._id, { $set: { Password: newHashPassword } })
                    res.send({ "status": "success", "message": "Password Reset Successfully" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Invalid Token" })
        }
    }

}

export default userController