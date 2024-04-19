import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class userController {

    // Rigester
    static userRigester = async (req, res) => {
        const { FirstName, LastName, Email, Phone, Password, PasswordConfirm } = req.body;
        const user = await UserModel.findOne({ Email: Email });
        if (user) {
            res.json({ status: 'failed', message: 'user already exit' })
        } else {
            if (FirstName && LastName && Email && Phone && Password && PasswordConfirm) {
                if (Password === PasswordConfirm) {
                    try {
                        const hashPassword = await bcrypt.hash(Password, 10)
                        const doc = new UserModel({
                            FirstName, LastName, Email, Phone, Password: hashPassword
                        })
                        await doc.save();

                        // Generate JWT Token
                        const savedUser = await UserModel.findOne({Email:Email})
                        const token = jwt.sign({userID:savedUser._id},process.env.JWT_TOKEN,{expiresIn:process.env.JWT_TOKEN_EXP})

                        res.json({ status: 'success', message: "User Rigester!!! 👍" , 'token':token})

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

    // Login
    static userLogin = async (req, res) => {
        const { Email, Password } = req.body;
        if (Email && Password) {
            const user = await UserModel.findOne({ Email: Email });
            if (user) {
                const password = await bcrypt.compare(Password,user.Password);
                if((Email === emailCheck) && password){
                    // Generate JWT Token
                    const token = jwt.sign({userID:user._id},process.env.JWT_TOKEN,{expiresIn:process.env.JWT_TOKEN_EXP})
                    res.json({status:"success",message:"login successfully!!! 👍",'token':token})
                }else{
                    res.json({status:"failed",message:"Email or Password is not valid! 😢"})
                }
            }else{
                res.json({status:"failed",message:"User not Rigester  😒"})
            }
        }else{
            res.json({status:"failed",message:"all field are required  😒"})

        }


    }
}

export default userController