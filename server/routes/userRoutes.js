import express from 'express'
// Middleware
import checkUserAuth from '../middlewares/auth-middlewares.js'
// Public
import UserControllerPublic from '../controllers/public/userController.js'
import eventControllerPublic from '../controllers/public/eventController.js'
// Admin
import eventController from '../controllers/admin/eventController.js'
import userControllerAdmin from '../controllers/admin/userController.js'

const router = express.Router();




// User Rigester Routes
router.post('/register', UserControllerPublic.userRegister)
router.post('/login', UserControllerPublic.userLogin)
router.post('/logged-user', checkUserAuth, UserControllerPublic.loggedUser)
router.post('/change-password', checkUserAuth, UserControllerPublic.changePassword)
router.post('/reset-password', UserControllerPublic.sendUserEmailResetPassword)

router.get('/user', checkUserAuth, userControllerAdmin.getUser)
router.delete('/user/:userId', checkUserAuth, userControllerAdmin.deleteUser)



// Event Routes for [organizer]
router.post('/events', checkUserAuth, eventController.addEvent)
router.get('/events', checkUserAuth, eventController.getEvents)
router.delete('/events/:eventId', checkUserAuth, eventController.deleteEvent)
router.put('/events/:eventId', checkUserAuth, eventController.updateEvent)
router.get('/events/:eventId', checkUserAuth, eventController.getEventsbyID)

router.get('/getEventsClient', eventControllerPublic.getEventsClient)



export default router;