const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const {
  registerUserValidation,
} = require('../validation/registerUserValidation');

async function registerUser(user) {
  registerUserValidation(user);

  const userExists = await User.findOne({ username: user.username });

  if (userExists) throw new Error('user already exists');

  const hashedPwd = await bcrypt.hash(user.password, 10);

  const newUser = await User.create({
    username: user.username,
    password: hashedPwd,
  });

  return newUser;
}

module.exports = registerUser;
