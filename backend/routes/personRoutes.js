import express from 'express'
import personController from '../controllers/personController'

const router = express.Router()

router.get("/person", personController.getPersons)

export default router