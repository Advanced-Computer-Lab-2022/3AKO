require('dotenv').config()

const adminRouter = require('./routes/adminRouter')
const courseRouter = require('./routes/courseRouter')
const individualTraineeRouter = require('./routes/individualTraineeRouter')

const corporateTraineeRouter = require('./routes/corporateTraineeRouter')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.url, req.method)
    next()
})

app.get('/', (req, res) => {
    res.send('hello world')
})


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT)

    })
    .catch((err) => {
        console.log(err)
    })

app.use('/admin', adminRouter)
app.use('/corporateTrainee', corporateTraineeRouter) 
app.use('/course', courseRouter)    
app.use('/individualTrainee', individualTraineeRouter)    

