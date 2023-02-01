import express from 'express'
import checkAuth from '../middlewares/checkAuth.middleware'

// Import all routes
import authRoutes from './auth.routes'
import usersRoutes from './users.routes'
import eventsRoutes from './events.routes'
import vocabularyRoutes from './vocabulary.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/events', eventsRoutes)
router.use('/vocabulary', vocabularyRoutes)

module.exports = router
