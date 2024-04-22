const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  // language: C, C++, Java, Python
  language: {
    type: String,
    required: true,
  },
  input: {
    type: String,
  },

  problem: {
    type: Schema.Types.ObjectId,
    ref: "problem",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Submission = mongoose.model("submission", SubmissionSchema);
