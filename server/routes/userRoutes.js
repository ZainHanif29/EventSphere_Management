import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

// Public Routes
router.post('/rigester',userController.userRigester)

// Protect Routes



// Routes Export 
export default router