import express from 'express'
import { UserRouter } from '../routes'

const app = express()

app.use((req, res, next) => {
    console.log('before request')
    next()
})

app.use('/api', UserRouter)

export default app