var { Schema, model } = require("mongoose");

var jediSchema = new Schema({
    jediname: {
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
    padawan: [{ type: Schema.Types.ObjectId, ref: "Jedi" }]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    id: false
    });

jediSchema.virtual("padawanCount").get(function () {
    return this.padawan.length;
});

var Jedi = model("Jedi", jediSchema);

module.exports = Jedi;