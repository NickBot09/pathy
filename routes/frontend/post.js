const express = require('express')
const router = express.Router()


router.get("/post", (req, res) => {
    // console.log('Working')
    res.sendFile(__dirname + '/post.html')
})

router.get("/saved-posts", (req, res) => {
    res.sendFile(__dirname + '/saved-post.html')
})

module.exports = router