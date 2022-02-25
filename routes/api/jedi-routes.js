var router = require("express").Router();
var {
    getAllJedis,
    getJediById,
    createJedi,
    updateJedi,
    deleteJedi,
    addPadawan,
    deletePadawan
} = require("../../controllers/jedi-controller");

router
    .route("/")
    .get(getAllJedis)
    .post(createJedi);

router.route("/:id")
    .get(getJediById)
    .put(updateJedi)
    .delete(deleteJedi)

router.route("/:jediId/padawans")
    .post(addPadawan)
    .delete(deletePadawan)

module.exports = router;