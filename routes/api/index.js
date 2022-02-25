var router = require("express").Router();
var userRoutes = require("./user-routes");
var thoughtRoutes = require("./thought-routes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;