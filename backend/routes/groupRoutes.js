const express = require('express')
const groupController = require('../controllers/groupController')

const groupRouter = express.Router()

groupRouter.get('/groups', groupController.getAllGroups)
groupRouter.get('/groups/:name', groupController.getAllGroups)
groupRouter.post('/groups', groupController.createGroup)
groupRouter.put('/groups/:name', groupController.updateGroupByName)

module.exports = groupRouter
