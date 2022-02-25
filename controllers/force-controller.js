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
            .then(dbForceData => {
                Jedi.findOneAndUpdate(
                    { _id: body.JediId },
                    { $push: { forces: dbForceData._id } },
                    { new: true }
                )
                    .then(dbJediData => {
                        if (!dbJediData) {
                            res.status(404).json({ message: "No id found" });
                            return;
                        }
                        res.json(dbJediData);
                    })
                    .catch(err => res.json(err));
            })
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

                Jedi.findOneAndUpdate(
                    { jediname: dbForceData.Jediname },
                    { $pull: { forces: params.id } }
                )
                    .then(() => {
                        res.json({ message: "Successfully deleted" });
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },

    addSkill({ params, body }, res) {
        Force.findOneAndUpdate(
            { _id: params.forceId },
            { $addToSet: { skills: body } },
            { new: true, runValidators: true }
        )
            .then(dbForceData => {
                if (!dbForceData) {
                    res.status(404).json({ message: "No id found" });
                    return;
                }
                res.json(dbForceData);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteSkill({ params, body }, res) {
        Force.findOneAndUpdate(
            { _id: params.forceId },
            { $pull: { skills: { skillId: body.skillId } } },
            { new: true, runValidators: true }
        )
            .then(dbForceData => {
                if (!dbForceData) {
                    res.status(404).json({ message: "No id found" });
                    return;
                }
                res.json({ message: "Successfully deleted" });
            })
            .catch(err => res.status(500).json(err));
    },
}

module.exports = forceController;