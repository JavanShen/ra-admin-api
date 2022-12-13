import express from 'express'

const app = express()

app.use(() => {
    console.log('before request')
})

app.get('/api', () => { })

export default app