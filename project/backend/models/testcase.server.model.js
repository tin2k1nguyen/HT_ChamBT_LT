const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  problem: {
    type: Schema.Types.ObjectId,
    ref: "problem",
  },
});

module.exports = TestCase = mongoose.model("testcase", TestCaseSchema);
