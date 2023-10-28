const mongoose = require("mongoose");
const { isEmail } = require("validator")

const PlayerSchema = new mongoose.Schema(
  {
    //! Required Information to REGISTER
    username: {
      type: String,
      required: [true, "Player Name is required."],
    },
    //! Required Information to REGISTER
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [isEmail, "Invalid email address"],
      unique: true
    },
    //! Required Information to REGISTER
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"]
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", PlayerSchema);
module.exports = User;
