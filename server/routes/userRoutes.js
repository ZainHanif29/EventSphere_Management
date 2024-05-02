import express from 'express'
import userController from '../controllers/userController.js'
import eventController from '../controllers/EventController.js'
import checkUserAuth from '../middlewares/auth-middlewares.js'
import boothController from '../controllers/boothController.js'

const router = express.Router()

// Route level Middleware - To Protect Route

// User controller
router.use('/loggeduser', checkUserAuth)
router.use('/changepassword', checkUserAuth)
// Event Controller
router.use('/addEvent', checkUserAuth)
router.use('/getevent', checkUserAuth)
router.use('/deleteEvent/:eventId', checkUserAuth)
router.use('/updateEvent/:eventId', checkUserAuth)
// Booth controller
router.use('/addBooth', checkUserAuth)
router.use('/getBooth', checkUserAuth)





// Public Routes
router.post('/rigester', userController.userRigester)
router.post('/login', userController.userLogin)
router.post('/reset-password', userController.sendUserEmailResetPassword)

// Protect Routes
router.post('/changepassword', userController.changePassword)
router.post('/loggeduser', userController.loggedUser)



// Admin Routes

// for Event Model
router.post('/addEvent', eventController.addEvent)
router.get('/getevent', eventController.getEvents)
router.get('/getEventsClient', eventController.getEvents)
router.delete('/deleteEvent/:eventId', eventController.deleteEvent)
router.put('/updateEvent/:eventId', eventController.updateEvent)

// for Booth Model
router.post('/addBooth', boothController.addBooth)
router.get('/getBooth', boothController.getBooth)



// Routes Export 
export default router;