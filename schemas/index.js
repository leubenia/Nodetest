const mongoose = require("mongoose");

const connect = () => {
  mongoose
    //.connect("mongodb://localhost:27017/voyage", {
    .connect("mongodb://dodo:dodo1@127.0.0.1:27017/voyage?authSource=admin", {
        useNewUrlParser: true, 
        ignoreUndefined: true  
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;