var { Schema, model } = require("mongoose");
var reactionSchema = require("./Reaction");
var moment = require("moment");

var thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MM DD, YYYY [at] hh:mm a")
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

var Thought = model("Thought", thoughtSchema);

module.exports = Thought;