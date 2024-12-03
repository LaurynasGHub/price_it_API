const User = require('../models/userModel');

async function getUserName(userID) {
  const findUser = await User.findOne({ _id: userID });

  if (!findUser) throw new Error(`Can't find user with ID: ${userID}`);

  // return userName
  return findUser.username;
}

module.exports = getUserName;
