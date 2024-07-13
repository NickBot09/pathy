const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
require('dotenv').config()

router.use(express.json())
const userArr = [{username:"admin",password:"aSuperSecureAndVeryLongPassw0rd"}, {username:"pathy",password:'pathy'}, {username:'test',password:'S3cur3_P@ssw0rd'}]

// router.post("/register", (req, res) => {
//     // console.log(req.body.username)
//     userArr.push({username:req.body.username, password: req.body.password})
//     res.redirect("/login")
// })

// router.get("/register", (req, res) => {
//     res.sendFile(__dirname + '/ui/register.html')
// })

router.get("/login", (req, res) => {
    res.sendFile(__dirname + '/ui/login.html')
})

router.post("/login", (req, res) => {
    const data = userArr.filter(user => user.username == req.body.username && user.password == req.body.password)
    if(data.length == 0) {
        res.status(403).json({msg:'Invalid username or password'})
    } else {
        const token = jwt.sign({username:data[0].username}, process.env.SECRET_KEY)
        res.json({token: token})
    }
    
})


module.exports = router