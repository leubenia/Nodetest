const mongoose = require("mongoose");

const { Schema } = mongoose;
const writeSchema = new Schema({
  writeId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: false
  },
  name:{
    type: String,
    required: true,
    unique: false
  },
  body:{
    type: String,
    required: true,
    unique: false
  },
  date: {
    type: String,
    required: true
  },
  pw: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("write", writeSchema);