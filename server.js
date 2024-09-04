require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

const urlRouter = require('./routes/url.route')
const userRouter = require('./routes/user.route')
const quizRouter = require('./routes/quiz.routes')

const PORT = process.env.PORT || 5000


// Enable CORS for all origins
app.use(cors())
app.use(express.json())
app.get('/test', (req, res) => {
    res.send('test route')
})
// app.use("/user", userRouter);
app.use('/', urlRouter)
app.use("/user", userRouter);
app.use('/quizzes', quizRouter);


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('Database connection successfull'))
.catch((err) => console.log('error in db connection', err));


app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })