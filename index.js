const express = require('express')
const app = express()
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const frontendPostRoute = require('./routes/frontend/post')
const loginRegisterRoute= require('./routes/login-register')
const flagRoute = require('./routes/bot')
require('dotenv').config()

let port = process.env.PORT || 3000

app.use(express.json())


app.get("/", (req, res) => {
    res.redirect('/login')
})

app.use(userRoute)
app.use(postRoute)
app.use(frontendPostRoute)
app.use(loginRegisterRoute)
app.use(flagRoute)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/`)
})