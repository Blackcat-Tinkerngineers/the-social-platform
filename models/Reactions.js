const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    creactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

reactionsSchema.virtual('thoughtCount').get(function () {
  return this.Thoughts.reduce(
    (total, thoughts) => total + thoughts.replies.length + 1,
    0
  );
});

const Reactions = model('Reactions', reactionsSchema);
module.exports = Reactions;
