var { Jedi, Force } = require("../models");

var jediController = {

    getAllJedis(req, res) {
        Jedi.find({})
            .populate({ path: "padawan", select: "-__v" })
            .select("-__v")
            .then(dbJediData => res.json(dbJediData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    getJediById({ params }, res) {
        Jedi.findOne({ _id: params.id })
            .populate({ path: "padawan", select: "-__v" })
            .select("-__v")
            .then(dbJediData => {
                if (!dbJediData) {
                    res.status(404).json({ message: "No jedi found" });
                    return;
                }
                res.json(dbJediData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createJedi({ body }, res) {
        Jedi.create(body)
            .then(dbJediData => res.json(dbJediData))
            .catch(err => res.status(400).json(err));
    },

    updateJedi({ params, body }, res) {
        Jedi.findOneAndUpdate(
            { _id: params.id },
             body,
            { new: true, runValidators: true }
            )
            .then(dbJediData => {
                if (!dbJediData) {
                    res.status(404).json({ message: "No jedi found" });
                    return;
                }
                res.json(dbJediData);
            })
            .catch(err => res.status(400).json(err));
    },


    deleteJedi({ params }, res) {
        Jedi.findOneAndDelete({ _id: params.id })
            .then(dbJediData => {
                if (!dbJediData) {
                    res.status(404).json({ message: "No jedi found" });
                    return;
                }

                Jedi.findOneAndUpdate(
                    { _id: { $in: dbJediData.padawan } },
                    { $pull: { padawans: params.id } }
                )
                    .then(() => {

                        Force.deleteMany({ jediname: dbJediData.jediname })
                            .then(() => {
                                res.json({ message: "Master Jedi is one with the force now...#force ghost" });
                            })
                            .catch(err => res.status(400).json(err));
                    })
            });
    },

    addPadawan({ params, body }, res) {
        Jedi.findOneAndUpdate(
            { _id: params.jediId },
            { $addToSet: { padawans: body } },
            { new: true, runValidators: true }
        )
            .then(dbJediData => {
                if (!dbJediData) {
                    res.status(404).json({ message: "No Jedi found" });
                    return;
                }
                res.json(dbJediData);
            })
            .catch(err => res.status(500).json(err));
    },

    deletePadawan({ params, body }, res) {
        Jedi.findOneAndUpdate(
            { _id: params.jediId },
            { $pull: { padawan: { skillId: body.padawanId } } },
            { new: true, runValidators: true }
        )
            .then(dbJediData => {
                if (!dbJediData) {
                    res.status(404).json({ message: "No Jedifound" });
                    return;
                }
                res.json({ message: " Young Padawan is one with the force now...#force ghost" });
            })
            .catch(err => res.status(500).json(err));
    },
}
module.exports = jediController;