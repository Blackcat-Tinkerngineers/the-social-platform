var router = require("express").Router();
var {
    getAllForces,
    getForceById,
    createForce,
    updateForce,
    deleteForce,
    addSkill,
    deleteSkill
} = require("../../controllers/force-controller");

router
    .route("/")
    .get(getAllForces)
    .post(createForce);

router
    .route("/:id")
    .get(getForceById)
    .put(updateForce)
    .delete(deleteForce);

router.route("/:forceId/skills/")
    .post(addSkill)
    .delete(deleteSkill)

module.exports = router;