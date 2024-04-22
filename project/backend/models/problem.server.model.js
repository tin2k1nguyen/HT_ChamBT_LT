const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // user created problem
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  // problem description
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Problem = mongoose.model("problem", ProblemSchema);
