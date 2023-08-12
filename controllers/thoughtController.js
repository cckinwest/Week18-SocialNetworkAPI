const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: `No thought with id ${req.params.thoughtId}` });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      await User.findOneAndUpdate(
        {
          username: thought.username,
        },
        {
          $addToSet: { thoughts: thought._id },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const newThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      res.status(200).json(newThought);
      console.log(`The thought with id ${req.params.thoughtId} is updated.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const result = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      await User.findOneAndUpdate(
        {
          username: result.username,
        },
        {
          $pull: { thoughts: req.params.thoughtId },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      res.status(200).json(result);
      console.log(`The thought with id ${req.params.thoughtId} is deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      console.log(`You are adding a reaction.`);
      console.log(req.body);

      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $addToSet: { reactions: req.body },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought found with that ID.",
        });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      console.log(
        `You are deleting a reaction with ID ${req.params.reactionId}.`
      );

      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought found with that ID.",
        });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
