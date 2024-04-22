const UserModel = require("../models/user.server.model");
const jwt = require("jsonwebtoken");
// check login by accessToken
const checkLogin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE);
      const user = await UserModel.findById(decoded.id);
      if (user == null) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Require login" });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { checkLogin };
