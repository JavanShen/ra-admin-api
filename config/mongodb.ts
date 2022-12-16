import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

mongoose.connect(process.env.CONNECTION_STRING as string).then(() => {
    console.log('mongodb connect')
}, err => {
    console.error('mongodb connect fail' + err)
})