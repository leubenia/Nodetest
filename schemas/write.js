const { boolean } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const rewriteSchema = new Schema({
  rebody:{
    type: String
  },
  pw:{
    type: String
  },
  username:{
    type: String
  }
})
const like = new Schema({
  like:{
    type: Boolean
  },
  name:{
    type: String,
    required: true,
    unique: true
  }
})

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
  rewrite: {
    type: [rewriteSchema],
    required: false
  },
  like:{
    type: [like],
    required: false
  }

});

module.exports = mongoose.model("write", writeSchema);