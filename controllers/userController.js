const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: `No user with id ${req.params.userId}` });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { runValidators: true, new: true }
      );

      res.status(200).json(newUser);
      console.log(`The user with id ${req.params.userId} is updated.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.userId });
      var deleteMessage = "";

      if (result.username) {
        const thoughtIds = (
          await Thought.find({ username: result.username })
        ).map((thought) => thought._id);

        await Thought.deleteMany({
          username: result.username,
        });

        thoughtIds.forEach((id) => {
          deleteMessage += `The thought with ID ${id} is deleted.\n`;
        });
      }

      res.status(200).json(result);

      console.log(`The user with id ${req.params.userId} is deleted.`);
      console.log(deleteMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      console.log(`You are adding a friend with ID ${req.params.friendId}.`);

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet: { friends: req.params.friendId },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user found with that ID.",
        });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      console.log(`You are deleting a friend with ID ${req.params.friendId}.`);

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: { friends: req.params.friendId },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user found with that ID.",
        });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
