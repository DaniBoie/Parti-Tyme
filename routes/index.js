const router = require('express').Router()

// connect your routes files here...

router.use('/api', require('./userRoutes.js'))

module.exports = router
