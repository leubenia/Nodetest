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
  },
  name:{
    tpye: String
  },
  body:{
    tpye: String
  },
  date: {
    type: String
  },
  pw: {
    type: String
  },
});

module.exports = mongoose.model("write", writeSchema);