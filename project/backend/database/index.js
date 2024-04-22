// connect to the database moongodb
const mongoose = require("mongoose");
const config = require("../config");
module.exports = () => {
  const db = mongoose.connect(
    process.env.DB_CONNECTION || config.db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (err) {
        console.log("Error connecting to the database. " + err);
      } else {
        console.log("Connected to Database: " + config.db);
      }
    }
  );
  return db;
};
