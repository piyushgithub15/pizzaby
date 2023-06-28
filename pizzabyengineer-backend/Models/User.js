const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobilenumber: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
