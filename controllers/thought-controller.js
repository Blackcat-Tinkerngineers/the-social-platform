const { createThought, updateThought, deleteThought } = require('../../../Users/eisle/AppData/Local/Temp/Temp1_fullstack-online 2.zip/fullstack-online/01-Class-Content/18-NoSQL/02-Challenge/Main/controllers/thought-controller');
const { Thoughts, Users } = require('../models');

const thoughtController = {
    getThoughts: (req, res) => {
        Thoughts.find()
            .sort({ createdAt: -1 })
            .then(dbThoughtData => {
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getOneThought: (req, res) => {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No id found' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((dbThoughtData) => {
                return Users.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({
                        message: 'No id found'
                    });
                }
                res.json({
                    message: 'Success'
                })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            });
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json
                        ({
                            message: 'No id found'
                        })
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No id found' });
                }
                res.json({ message: 'successfully deleted!' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No id found' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No id found' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = thoughtController;

