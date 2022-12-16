import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

router.post('/login', async (req, res) => {
    const { body: { username, password } } = req

    const payload = await UserController.login(username, password)
    
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

router.post('/register', async (req, res) => {
    const { body: { username, password } } = req
    
    const payload = await UserController.register(username, password)
    
    res.send(payload)
})

export default router