const mongoose = require("mongoose");

const UserAuthShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  acctype: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

const UserAuthModal = new mongoose.model("user", UserAuthShema);

module.exports = UserAuthModal;
