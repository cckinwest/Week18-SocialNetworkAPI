const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: String,
    createdAt: Date,
    username: String,
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const reactionSchema = new Schema(
  {
    reactionId: Schema.Types.ObjectId,
    reactionBody: String,
    username: String,
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: { getters: true },
  }
);

function formatDate(date) {
  return date.split("T")[0];
}

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
