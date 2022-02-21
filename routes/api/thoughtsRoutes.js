const router = require('express').Router();

const {
    getAllThoughts,
    getOneThoughtById,
    createThought,
    updateThoughtById,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../controllers/thoughtsController');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getOneThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought);
    
router
    .route('/:thoughtId/:reactionId')
    .post(addReaction);
    
router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction);
    
 module.exports = router;
    