// setup router
const express = require("express");
const { checkLogin } = require("../middlewares/index.js");
const router = express.Router();

// api comiple code
// setup prefix api
// router.use("/compile", checkLogin, require("./compile.router.js"));
router.use("/user", require("./user.router.js"));
router.use("/problem", checkLogin, require("./problem.router.js"));
router.use("/history", checkLogin, require("./history.router.js"));
router.use("/submission", checkLogin, require("./submission.router.js"));
router.use("/testcase", checkLogin, require("./testcase.router.js"));
module.exports = router;
