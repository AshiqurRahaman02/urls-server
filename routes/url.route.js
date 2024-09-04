const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const { createShortUrl, redirectToOriginalUrl, deleteUrl } = require('../controllers/url.controller')
const userRouter = require('./user.route')
const urlRouter = express.Router()


// create short url
urlRouter.post('/', createShortUrl)

// find and redirect to original url
urlRouter.get('/:shortUrlId', redirectToOriginalUrl)

// delete single url
urlRouter.delete('/', deleteUrl)

urlRouter.get('/', (req, res) => {
    res.json({message: 'Success'})
})
urlRouter.use("/user", userRouter);

module.exports = urlRouter