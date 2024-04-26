import express from 'express'
import userController from '../controllers/userController.js'
import eventController from '../controllers/EventController.js'
import checkUserAuth from '../middlewares/auth-middlewares.js'

const router = express.Router()

// Route level Middleware - To Protect Route
router.use('/changepassword',checkUserAuth)
router.use('/loggeduser',checkUserAuth)
router.use('/addEvent',checkUserAuth)




// Public Routes
router.post('/rigester',userController.userRigester)
router.post('/login',userController.userLogin)
router.post('/reset-password',userController.sendUserEmailResetPassword)

// Protect Routes
router.post('/changepassword',userController.changePassword)
router.post('/loggeduser',userController.loggedUser)



// Admin Routes

// for Event Model
router.post('/addEvent',eventController.addEvent)
router.get('/getevent',eventController.getEvents)
router.delete('/deleteEvent/:eventId',eventController.deleteEvent)
router.put('/updateEvent/:eventId',eventController.updateEvent)


// Routes Export 
export default router