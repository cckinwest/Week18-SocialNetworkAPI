const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username required!"],
    unique: [true, "This username is used by someone else."],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        const emailRegex = new RegExp(
          /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
        );
        return emailRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "Email required!"],
  },
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
