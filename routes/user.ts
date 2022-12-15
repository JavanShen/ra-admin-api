import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

router.post('/login', (req, res) => {
    const { body: { username, password } } = req

    const payload = UserController.login(username, password)
    
    if (payload.code === 0) {
        res.send(payload)
    } else {
        res.header('Authorization', payload.token)
        res.send({
            code: 1,
            message: '登录成功'
        })
    }
})

router.post('/register', (req, res) => {
    const { body: { username, password } } = req
    
    const payload = UserController.register(username, password)
    
    res.send(payload)
})

export default router