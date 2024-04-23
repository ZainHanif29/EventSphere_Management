import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

const checkUserAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new Error('Unauthorized User, No Token');
    }

    const token = authorization.split(' ')[1];
    const { userID } = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await UserModel.findById(userID).select('-Password');
    next();
  } catch (error) {
    console.error(error);
    res.json({ status: "failed", message: error.message });
  }
};

export default checkUserAuth;