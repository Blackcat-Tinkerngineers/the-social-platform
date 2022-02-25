var router = require("express").Router();
var apiRoutes = require("./api/");
var userRoutes = require("./api/user-routes");
var thoughtRoutes = require("./api/thought-routes");


router.use("/api", apiRoutes);
router.use("/", userRoutes);
router.use("/", thoughtRoutes);

router.use((req, res) => {
    res.status(404).send("<h1>hi</h1>");
})

module.exports = router;