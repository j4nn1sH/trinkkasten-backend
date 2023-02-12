import express from 'express'

// Import all routes
import authRoutes from './auth.routes'
import shopRoutes from './shop.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/shop', shopRoutes)

module.exports = router
