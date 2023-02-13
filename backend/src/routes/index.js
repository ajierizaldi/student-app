const express = require('express');
const router = express.Router();

const todo = require('./todo');

router.get('/check-health', (req, res) => {
    res.send('Hello World!');
});

router.use('/todo', todo);

module.exports = router;