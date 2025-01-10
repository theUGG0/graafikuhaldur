const express = require('express')
const personController = require('../controllers/personController')

const router = express.Router()

router.get('/person', personController.getPersons)

module.exports = router
