import express from 'express'

// Import all routes
import authRoutes from './auth.routes'

const router = express.Router()

router.use('/auth', authRoutes)

module.exports = router
