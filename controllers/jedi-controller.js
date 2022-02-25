var { Jedi, Force } = require("../models");

var jediController = {

    getAllJedis(req, res) {
        Jedi.find({})
        .select("-__v")
        .then(dbJediData => res.json(dbJediData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getJediById({ params }, res) {
        Jedi.findOne({ _id: params.id })
        .populate([
            { path: "forces", select: "-__v" },
            { path: "padawan", select: "-__v" }
        ])
        .select("-__v")
        .then(dbJediData => {
            if (!dbJediData) {
                res.status(404).json({message: "No jedi found"});
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
        Jedi.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
                res.status(404).json({ message: "No jedi found"});
                return;
            }

            Jedi.updateMany(
                { _id : {$in: dbJediData.padawan } },
                { $pull: { padawan: params.id } }
            )
            .then(() => {

                Force.deleteMany({ jediname : dbJediData.jediname })
                .then(() => {
                    res.json({message: "Successfully deleted"});
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    addPadawan({ params }, res) {
       Jedi.findOneAndUpdate(
            { _id: params.jediId },
            { $addToSet: { padawan: params.padawanId } },
            { new: true, runValidators: true }
        )
        .then(dbJediData => {
            if (!dbJediData) {
                res.status(404).json({ message: "No jedi found" });
                return;
            }

            Jedi.findOneAndUpdate(
                { _id: params.padawanId },
                { $addToSet: { padawan: params.jediId } },
                { new: true, runValidators: true }
            )
            .then(dbJediData => {
                if(!dbJediData) {
                    res.status(404).json({ message: "No jedi found" })
                    return;
                }
                res.json(dbJediData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },

    deletePadawan({ params }, res) {
        Jedi.findOneAndUpdate(
            { _id: params.jediId },
            { $pull: { padawan: params.padawanId } },
            { new: true, runValidators: true }
        )
        .then(dbJediData => {
            if (!dbJediData) {
                res.status(404).json({ message: "No jedi found" });
                return;
            }
            Jedi.findOneAndUpdate(
                { _id: params.padawanId },
                { $pull: { padawan: params.jediId } },
                { new: true, runValidators: true }
            )
            .then(dbJediData => {
                if(!dbJediData) {
                    res.status(404).json({ message: "No jedi found" })
                    return;
                }
                res.json({message: "Successfully deleted"});
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    }
}

module.exports = jediController;