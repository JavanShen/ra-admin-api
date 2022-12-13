import express from 'express'
import { UserRouter } from '../routes'

const app = express()

app.use(() => {
    console.log('before request')
})

app.use('/api', UserRouter)

export default app