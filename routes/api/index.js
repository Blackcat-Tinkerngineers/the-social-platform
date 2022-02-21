const router = require('express').Router();
const thoughtsRoutes = require('./thoughts');
const usersRoutes = require('./users');
const reactionsRoutes = require('./reactions');


router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);
router.use('/reactions', reactionsRoutes);

module.exports = router;
