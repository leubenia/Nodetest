const mongoose = require("mongoose");

const { Schema } = mongoose;
const writeSchema = new Schema({
  writeId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    tpye: String
  },
  body:{
    tpye: String
  },
  date: {
    type: Number
  },
  pw: {
    type: String
  },
});

module.exports = mongoose.model("write", writeSchema);