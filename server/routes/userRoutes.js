import express from 'express'

// Middleware
import checkUserAuth from '../middlewares/auth-middlewares.js'

// Controller
// Public
import userControllerPublic from '../controllers/public/userController.js'
import eventControllerPublic from '../controllers/public/eventController.js'
// Admin
import eventController from '../controllers/admin/eventController.js'
import boothController from '../controllers/admin/boothController.js'
import userControllerAdmin from '../controllers/admin/userController.js'

const router = express.Router();




// User Rigester Routes
router.post('/register', userControllerPublic.userRigester)
router.post('/login', userControllerPublic.userLogin)
router.post('/logged-user', checkUserAuth, userControllerPublic.loggedUser)
router.post('/change-password',checkUserAuth ,userControllerPublic.changePassword)
router.post('/reset-password' ,userControllerPublic.sendUserEmailResetPassword)

// Event Routes for [organizer or exhibitor]
router.post('/events', checkUserAuth, eventController.addEvent)
router.get('/events', checkUserAuth, eventController.getEvents)
router.delete('/events/:eventId', checkUserAuth, eventController.deleteEvent)
router.put('/events/:eventId', checkUserAuth, eventController.updateEvent)

// organizer Routes
router.post('/addBooth', checkUserAuth, boothController.addBooth)
router.get('/getBooth', checkUserAuth, boothController.getBooth)

router.get('/user', checkUserAuth, userControllerAdmin.getUser)
router.delete('/user/:userId', checkUserAuth, userControllerAdmin.deleteUser)


// attendee Routes
router.get('/getEventsClient', eventControllerPublic.getEventsClient)





// Routes Export 
export default router;