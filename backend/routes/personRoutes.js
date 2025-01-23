const express = require('express')
const personController = require('../controllers/personController')

const personRouter = express.Router()

personRouter.get('/persons', personController.getAllPersons)
personRouter.get('/persons/:name', personController.getPersonByName)
personRouter.post('/persons', personController.addPerson)
personRouter.put('/persons/:name', personController.updatePersonByName)

module.exports = personRouter
