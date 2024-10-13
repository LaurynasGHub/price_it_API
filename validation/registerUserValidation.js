function registerUserValidation(props) {
  if (!props?.username?.trim()) {
    throw new Error('User name is required, please check if provided');
  }

  if (!props?.password?.trim()) {
    throw new Error('Password is required, please check if provided');
  }
}

module.exports = { registerUserValidation };
