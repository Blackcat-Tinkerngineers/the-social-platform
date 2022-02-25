var { Schema, model } = require("mongoose");
var skillSchema = require("./skill");
var moment = require("moment");

var forceSchema = new Schema({
    forceText: {
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
    jediname: {
        type: String,
        required: true
    },
    skills: [skillSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

forceSchema.virtual("skillCount").get(function () {
    return this.skills.length;
});

var force = model("Force", forceSchema);

module.exports = force;