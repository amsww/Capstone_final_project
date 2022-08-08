const mongoose = require("mongoose");

const url = `mongodb+srv://Ameen_Abdulla:CL2TbVO0UNeMbi31@cluster0.mddxk7u.mongodb.net/?retryWrites=true&w=majority`

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
