const bcrypt = require("bcryptjs");

// brcrypt password hashing
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// brcrypt password compare
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
