const express = require('express');
const router = express.Router();

const {
    create,
    findAll,
    findOne,
    update,
    destroy,
    deleteAll,
    findAllPublished
} = require('./controllers/todoController');

router.get('/', findAll);
router.get('/:id', findOne);
router.get('/published', findAllPublished);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);
router.delete('/', deleteAll);

module.exports = router;