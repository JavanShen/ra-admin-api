import express from 'express'
import { UserRouter } from '../routes'
import jwt from '../utils/jwt'
import { whiteListUrl } from '../whiteList' 
import { verifyUserExist } from '../utils/validate'
import * as dotenv from 'dotenv'

import type { Payload } from '../types/user'

dotenv.config()

import '../config/mongodb'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE',
        'Content-Type': 'application/json; charset=utf-8',
    })
    next()
})

app.use(async (req, res, next) => {
    const { url, headers } = req

    if (whiteListUrl.includes(url)) return next()
    const token = headers['authorization']?.replace(/^Bearer\s/, '')

    if (!token) return res.status(401).send({ errCode: -1, errInfo: '缺少token' })

    const payload = jwt.verify(token) as Payload

    if (!payload) return res.status(401).send({ errCode: -1, errInfo: 'token过期' })
    
    const { username } = payload

    if(!verifyUserExist(username)) return res.status(401).send({errCode: -1, errInfo: '无效token'})

    const newToken = jwt.generate({
        username
    }, '1d')

    res.header('Authorization', newToken)

    next()
})

app.use('/api', UserRouter)

export default app