var { Schema, model, Types } = require("mongoose");
var moment = require("moment");

var skillSchema = new Schema({
    skillId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    skillBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    jediname: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    }
},
    {
        toJSON: {
            getters: true
        },
        id: false
    });

module.exports = skillSchema;