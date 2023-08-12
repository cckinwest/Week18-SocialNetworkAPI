const { Schema, model, Types } = require("mongoose");

function reformat(dateObj) {
  const dateString = dateObj.toISOString();

  const date = dateString.split("T")[0];
  const hour = dateString.split("T")[1].split(":")[0];
  const minute = dateString.split("T")[1].split(":")[1];

  return `On ${date}, at ${hour}:${minute}`;
}

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: [280, "Text length exceeds 280!"],
    },
    username: {
      type: String,
      required: [true, "Username required!"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: (v) => reformat(v),
    },
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "Text required!"],
      minlength: [1, "Text required!"],
      maxlength: [280, "Text length (exceeds 280!"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: (v) => reformat(v),
    },
    username: {
      type: String,
      required: [true, "Username required!"],
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
