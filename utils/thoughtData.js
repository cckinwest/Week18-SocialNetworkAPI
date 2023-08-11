const { usernames } = require("./userData");

const thoughts = [
  "Hi, it's the first time I come here",
  "Yeah, today is a nice day.",
  "Oh no, today is so worst.",
  "It's the perfect platform to express what I think.",
  "There are many haters here.",
  "Hello, how are you?",
  "I am not good.",
  "I am so happy.",
  "I am unhappy.",
  "Yesterday I slept early and now I am full of energy.",
  "Last night I slept late so now I am so tired...",
];

const reactions = [
  "Hey guy, I am good too!",
  "I think so.",
  "I disagree!",
  "Yeah!",
  "I feel good!",
];

const getRandomReaction = () => {
  numberOfReactions = Math.floor(Math.random() * 2);

  const reactionsList = [];

  if (numberOfReactions) {
    for (let i = 0; i < numberOfReactions; i++) {
      reactionsList.push({
        reactionBody: reactions[Math.floor(Math.random() * reactions.length)],
        username: getRandomUser(),
      });
    }
  }

  return reactionsList;
};

const getRandomUser = () => {
  return usernames[Math.floor(Math.random() * usernames.length)];
};

const getRandomThought = () => {
  return thoughts[Math.floor(Math.random() * thoughts.length)];
};

const getThoughts = (numberOfThoughts) => {
  const thoughtsList = [];

  for (let i = 0; i < numberOfThoughts; i++) {
    thoughtsList.push({
      thoughtText: getRandomThought(),
      username: getRandomUser(),
      reactions: getRandomReaction(),
    });
  }

  return thoughtsList;
};

module.exports = { getThoughts };
