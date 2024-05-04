import express from 'express'

// Middleware
import checkUserAuth from '../middlewares/auth-middlewares.js'

// Controller
import userControllerPublic from '../controllers/public/userController.js'
import eventController from '../controllers/admin/eventController.js'
import boothController from '../controllers/admin/boothController.js'
import userControllerAdmin from '../controllers/admin/userController.js'

const router = express.Router();




// User Rigester Routes
router.post('/rigester', userControllerPublic.userRigester)
router.post('/login', userControllerPublic.userLogin)
router.post('/loggeduser', checkUserAuth, userControllerPublic.loggedUser)
// router.post('/changepassword',checkUserAuth ,userController.changePassword)

// Event Routes for [organizer or exhibitor]
router.post('/addEvent', checkUserAuth, eventController.addEvent)
router.get('/getevent', checkUserAuth, eventController.getEvents)
router.delete('/deleteEvent/:eventId', checkUserAuth, eventController.deleteEvent)
router.put('/updateEvent/:eventId', checkUserAuth, eventController.updateEvent)

// organizer Routes
router.post('/addBooth', checkUserAuth, boothController.addBooth)
router.get('/getBooth', checkUserAuth, boothController.getBooth)
router.get('/getuser', checkUserAuth, userControllerAdmin.getUser)

// exhibitor Routes

// attendee Routes
router.get('/getEventsClient', eventController.getEventsClient)





// Routes Export 
export default router;