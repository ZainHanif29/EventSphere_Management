import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

// Public Routes
router.post('/rigester',userController.userRigester)
router.post('/login',userController.userLogin)

// Protect Routes



// Routes Export 
export default router