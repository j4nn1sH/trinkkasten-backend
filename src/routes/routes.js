import express from 'express'

// Import all routes
import authRoutes from './auth.routes'
import shopRoutes from './shop.routes'
import userRoutes from './user.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/shop', shopRoutes)
router.use('/user', userRoutes)

module.exports = router
