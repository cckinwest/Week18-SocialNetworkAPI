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
  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  const thoughts = getThoughts(50);
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
