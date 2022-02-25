var router = require("express").Router();
var apiRoutes = require("./api/");
var jediRoutes = require("./api/jedi-routes");
var forceRoutes = require("./api/force-routes");


router.use("/api", apiRoutes);
router.use("/", jediRoutes);
router.use("/", forceRoutes);

router.use((req, res) => {
    res.status(404).send("<h1>hi</h1>");
})

module.exports = router;