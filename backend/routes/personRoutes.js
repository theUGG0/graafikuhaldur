const express = require('express')
const personController = require('../controllers/personController')

const router = express.Router()

router.get('/persons', personController.getAllPersons)
router.get('/persons/:name', personController.getPersonByName)
router.post('/persons', personController.addPerson)

module.exports = router
