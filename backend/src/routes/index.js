const express = require('express');
const router = express.Router();
const cors = require('cors');

const todo = require('./todo');
const user = require('./user');

router.use(cors());

router.get('/check-health', (req, res) => {
    res.send('Hello World!');
});

router.use('/todo', todo);

module.exports = router;