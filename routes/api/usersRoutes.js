const router = require('express').Router();

const {
    getAllUsers,
    getOneUserById,
    createUser,
    createFollow,
    updateUserById,
    deleteUserById,
    deleteFollowById,
    deleteUserbyThoughtId,
}
    = require('../controllers/usersController');

 router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getOneUserById)
    .put(updateUserById)
    .delete(deleteUserById);

router
    .route('/:userId/:thoughtId')
    .delete(deleteUserbyThoughtId);
    
router
    .route('/:userId/follows/:followId')
    .post(createFollow)
    .delete(deleteFollowById);

module.exports = router;    
        