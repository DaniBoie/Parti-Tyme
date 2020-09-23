const router = require('express').Router()

// connect your routes files here...
// router.use('/api', require('./SettingsRoutes.js'))
router.use('/api', require('./BuisnessRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./ReviewRoutes.js'))

module.exports = router
