# Social Network API

My challenge is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. I’ll use Express.js for routing, a MongoDB database, and the Mongoose ODM. In addition to using the Express.jsLinks to an external site. and MongooseLinks to an external site. packages, I may also optionally use a JavaScript date library of my choice or the native JavaScript Date object to format timestamps.

Because this application won’t be deployed, I’ll create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. I’ll need to submit a link to the video and add it to the README of your project.

## Functions

- When I enter the command to invoke the application, then my server is started and the Mongoose models are synced to the MongoDB database.
- When I open API GET routes in Insomnia for users and thoughts, then the data for each of these routes is displayed in a formatted JSON.
- When I test API POST, PUT, and DELETE routes in Insomnia, then I am able to successfully create, update, and delete users and thoughts in my database.
- When I test API POST and DELETE routes in Insomnia, then I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.

## Installation

- Go to an empty folder and type 'git clone https://github.com/cckinwest/Week18-SocialNetworkAPI.git' in the terminal to pull all the folders and files of the app.
- Type 'npm i' to install all packages required.
- Type 'npm run seed' to seed the database with sample data.
- Type 'npm run dev' to run the app server.

## User api

- Get method:\
  ![users_get](./screenshots/users_get.png)

- Get one single user:\
  ![users_getone](./screenshots/users_getone.png)

- Post:\
  ![users_post](./screenshots/users_post.png)

- Update:\
  ![users_update1](./screenshots/users_update1.png)
  ![users_update2](./screenshots/users_update2.png)

- Delete:\
  ![users_delete1](./screenshots/users_delete1.png)
  ![users_delete2](./screenshots/users_delete2.png)

- Add a friend:\
  ![users_addFriend1](./screenshots/users_addFriend1.png)
  ![users_addFriend2](./screenshots/users_addFriend2.png)

- Delete a friend\
  ![users_deleteFriend1](./screenshots/users_deleteFriend1.png)
  ![users_deleteFriend2](./screenshots/users_deleteFriend2.png)

## Thought api

- Get method:\
  ![thoughts_get](./screenshots/thoughts_get.png)

- Get one single thought:\
  ![thoughts_getone](./screenshots/thoughts_getone.png)

- Post:\
  ![thoughts_post](./screenshots/thoughts_post.png)

- Update:\
  ![thoughts_update1](./screenshots/thoughts_update1.png)
  ![thoughts_update2](./screenshots/thoughts_update2.png)

- Delete:\
  ![thoughts_delete1](./screenshots/thoughts_delete1.png)
  ![thoughts_delete2](./screenshots/thoughts_delete2.png)

- Add a reaction:\
  ![thoughts_addReaction1](./screenshots/thoughts_addReaction1.png)
  ![thoughts_addReaction2](./screenshots/thoughts_addReaction2.png)

- Delete a reaction\
  ![thoughts_deleteReaction1](./screenshots/thoughts_deleteReaction1.png)
  ![thoughts_deleteReaction2](./screenshots/thoughts_deleteReaction2.png)

## Extra

- The 'createdAt' in Thought API is now re-format into the form 'On Date, at Time' using a getter:\
  ![date-reformat](./screenshots/date-reformat.png)
- When a user is deleted, all their thoughts are also deleted.

## Deployment

The link is: [Social-Network-API](https://github.com/cckinwest/Week18-SocialNetworkAPI)

The demo is: [Demo](https://drive.google.com/file/d/1op_N2bFtm_50NPZLAJE0l1DvTpp5bxzh/view)
