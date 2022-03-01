var { Jedi, Force, Skill } = require("../models");

var forceController = {
    getAllForces(req, res) {
        Force.find({})
            .populate({ path: "skills", select: "-__v" })
            .select("-__v")
            .then(dbForceData => res.json(dbForceData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    getForceById({ params }, res) {
        Force.findOne({ _id: params.id })
            .populate({ path: "skills", select: "-__v" })
            .select("-__v")
            .then(dbForceData => {
                if (!dbForceData) {
                    res.status(404).json({ message: "No id found" });
                    return;
                }
                res.json(dbForceData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createForce({ body }, res) {
        Force.create(body)
            .then(dbForceData => res.json(dbForceData))
            .catch(err => res.status(400).json(err));
    },

    updateForce({ params, body }, res) {
        Force.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .then(dbForceData => {
                if (!dbForceData) {
                    res.status(404).json({ message: "No id found" });
                    return;
                }
                res.json(dbForceData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteForce({ params }, res) {
        Force.findOneAndDelete({ _id: params.id })
            .then(dbForceData => {
                if (!dbForceData) {
                    res.status(404).json({ message: "No id found" });
                    return;
                }

                Force.findOneAndUpdate(
                    { Forcename: dbForceData.Forcename },
                    { $pull: { forces: params.id } }
                )
                    .then(() => {
                        res.json({ message: "Successfully deleted" });
                    })
                    .catch(err => res.status(500).json(err));
            });
    },

    addSkill({ params, body }, res) {
        Force.findOneAndUpdate(
            { _id: params.forceId },
            { $addToSet: { skills: body } },
            { new: true, runValidators: true }
        )
            .then(dbForceData => {
                if (!dbForceData) {
                    res.status(404).json({ message: "No force found" });
                    return;
                }
                res.json(dbForceData);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteSkill({ params }, res) {
    Force.findOneAndUpdate(
        { _id: params.forceId },
        { $pull: { skills: { _id: params.skillId } } },
        { new: true, runValidators: true }
    )
        .then(dbForceData => {
            if (!dbForceData) {
                res.status(404).json({ message: "No force found" });
                return;
            }
            res.json(dbForceData);
        })
        .catch(err => res.status(500).json(err));
}
};
 
module.exports = forceController;