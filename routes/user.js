const express = require('express')
const isAuth = require('../helpers/auth-check')
const router = express.Router()


router.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + '/ui/dashboard.html')
})

module.exports = router