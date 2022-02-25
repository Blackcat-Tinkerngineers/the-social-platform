var { Schema, model } = require("mongoose");

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

var User = model("User", userSchema);

module.exports = User;