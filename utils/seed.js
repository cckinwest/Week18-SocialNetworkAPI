const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getUsers } = require("./userData");
const { getThoughts } = require("./thoughtData");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();

  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();

  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  const users = getUsers();
  await User.collection.insertMany(users);

  const thoughts = getThoughts(50);
  await Thought.collection.insertMany(thoughts);

  const userIds = (await User.find()).map((user) => user._id);

  for (let i = 0; i < userIds.length; i++) {
    const friendsList = [];

    const username = (await User.findOne({ _id: userIds[i] })).username;

    const thoughtList = (await Thought.find({ username: username })).map(
      (thought) => thought._id
    );

    for (let j = 0; j < 3; j++) {
      var randomIndex = Math.floor(Math.random() * userIds.length);
      if (randomIndex !== i) {
        friendsList.push(userIds[randomIndex]);
      }
    }

    await User.findOneAndUpdate(
      { _id: userIds[i] },
      {
        $addToSet: {
          friends: { $each: friendsList },
          thoughts: { $each: thoughtList },
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
  }

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
