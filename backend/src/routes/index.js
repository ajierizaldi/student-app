const express = require('express');
const router = express.Router();

router.get('/check-health', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;