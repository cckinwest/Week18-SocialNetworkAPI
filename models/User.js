const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  email: String,
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const User = model("user", userSchema);

module.exports = User;
