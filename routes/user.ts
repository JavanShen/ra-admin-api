import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

router.get('/login', (req, res) => {
    res.send(UserController.login())
})

export default router