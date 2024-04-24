import express from 'express'
import userController from '../controllers/userController.js'
import eventController from '../controllers/EventController.js'
import checkUserAuth from '../middlewares/auth-middlewares.js'

const router = express.Router()

// Route level Middleware - To Protect Route
router.use('/changepassword',checkUserAuth)
router.use('/loggeduser',checkUserAuth)
router.use('/event',checkUserAuth)



// Public Routes
router.post('/rigester',userController.userRigester)
router.post('/login',userController.userLogin)
router.post('/reset-password',userController.sendUserEmailResetPassword)

// Protect Routes
router.post('/changepassword',userController.changePassword)
router.post('/loggeduser',userController.loggedUser)
router.post('/event',eventController.addEvent)



// Routes Export 
export default router