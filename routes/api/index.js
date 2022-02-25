var router = require("express").Router();
var JediRoutes = require("./Jedi-routes");
var forceRoutes = require("./force-routes");

router.use("/Jedis", JediRoutes);
router.use("/forces", forceRoutes);

module.exports = router;