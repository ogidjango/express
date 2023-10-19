const express = require('express')
const router = express.Router()

//get all
router.get('/', (req, res) => {
    res.send('Hello World')
})
// get one
// create one
// update one
// delete one

module.exports = router