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
            message: '登录成功',
            data: {}
        })
    }
})

router.post('/register', async (req, res) => {
    const { body: { username, password } } = req
    
    const payload = await UserController.register(username, password)
    
    res.send({
        ...payload,
        data: {}
    })
})

router.get('/userinfo', (req, res) => {
    const token = res.getHeader('Authorization')

    const {username, role} = UserController.getUserInfoByToken(token as string)

    if (username && role) {
        res.send({
            code: 1,
            message: '获取用户信息成功',
            data: {
                username,
                role
            }
        })
    } else {
        res.send({
            code: 0,
            message: '获取用户信息失败',
            data: {}
        })
    }
})

export default router