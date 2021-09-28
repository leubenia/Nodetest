const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  pw: {
    type: String,
    required: true,
    unique: false
  },
  name:{
    type: String,
    required: true,
    unique: false
  },
  iswhat:{
    type: Boolean,
    required: true,
    unique: false
  },
  salt:{
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model("user", userSchema);