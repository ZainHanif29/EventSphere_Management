// import jwt from 'jsonwebtoken'
// import UserModel from '../models/userModel.js'

// var checkUserAuth = async (req, res, next) => {
//   let token;
//   const { authorization } = req.headers
//   if (authorization && authorization.startsWith('Bearer')) {
//     try {
//       // Get Token from header
//       token = authorization.split(' ')[1]

//       console.log(authorization);
//       console.log('token' , token);

//       // Verify Token
//       const { userID } = jwt.verify(token, process.env.JWT_TOKEN)

//       // Get User from Token
//       req.user = await UserModel.findById(userID).select('-Password')
      
//       next()
//     } catch (error) {
//       console.log(error)
//       res.json({ "status": "failed", "message": "Unauthorized User" })
//     }
//   }
//   if (!token) {
//     res.json({ "status": "failed", "message": "Unauthorized User, No Token" })
//   }
// }

// export default checkUserAuth

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
    res.json({ "status": "failed", "message": error.message });
  }
};

export default checkUserAuth;