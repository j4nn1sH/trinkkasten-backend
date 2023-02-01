import express from 'express'

// Import all routes
import authRoutes from './auth.routes'
import eventsRoutes from './events.routes'
import vocabularyRoutes from './vocabulary.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/events', eventsRoutes)
router.use('/vocabulary', vocabularyRoutes)

module.exports = router
