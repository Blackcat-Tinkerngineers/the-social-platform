const { Users, Thoughts } = require('../models');

const userController = {

    getAllUsers(req, res) {
        Users.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    getUserById({ params }, res) {
        Users.findOne({ _id: params.id })
            .populate([
                { path: 'thoughts', select: '-__v' },
                { path: 'follows', select: '-__v' }
            ])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No id found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res) {
        Users.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No id found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No id found' });
                    return;
                }
                Users.updateMany(
                    { _id: { $in: dbUserData.follows } },
                    { $pull: { follows: params.id } }
                )
                    .then(() => {
                        Thoughts.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: 'Successfully deleted' });
                            })
                            .catch(err => res.status(400).json(err));
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    addFollow({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { follows: params.FollowId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No id found' });
                    return;
                }
                Users.findOneAndUpdate(
                    { _id: params.FollowId },
                    { $addToSet: { follows: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserData2 => {
                        if (!dbUserData2) {
                            res.status(404).json({ message: 'No id found' });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },

    deleteFollow({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { follows: params.FollowId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No id found' });
                    return;
                }
                Users.findOneAndUpdate(
                    { _id: params.FollowId },
                    { $pull: { follows: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserData2 => {
                        if (!dbUserData2) {
                            res.status(404).json({ message: 'No id found' });
                            return;
                        }
                        res.json({ message: 'Successfully deleted' });
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;