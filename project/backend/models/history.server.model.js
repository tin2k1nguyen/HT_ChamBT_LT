const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  submission: {
    type: Schema.Types.ObjectId,
    ref: "submission",
  },
  // problem
  problem: {
    type: Schema.Types.ObjectId,
    ref: "problem",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  // testcase display object
  testcase: {
    type: Schema.Types.ObjectId,
    ref: "testcase",
  },
  output: {
    type: String,
  },

  // status
  // 0: pending
  // 1: accepted
  // 2: wrong
  status: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
  },
  memory: {
    type: Number,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = History = mongoose.model("history", HistorySchema);
