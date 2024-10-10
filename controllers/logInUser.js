const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function logInUser({ username, password }) {
  if (!username || !password)
    throw new Error('username and password are required');

  const findUser = await User.findOne({ username });

  if (!findUser) throw new Error('username or password is incorrect');

  const match = await bcrypt.compare(password, findUser.password);

  if (!match) throw new Error('username or password is incorrect');

  //create token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '2s',
  });

  console.log('logged in');

  //grazinam userId arba token
  return findUser._id;
  // return { token };
}

module.exports = logInUser;
