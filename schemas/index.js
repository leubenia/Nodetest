const mongoose = require("mongoose");

const connect = () => {
  mongoose
  //mongodb://localhost:27017/voyage
    .connect("mongodb://test:test@127.0.0.1:27017/voyage", {
        useNewUrlParser: true, 
        ignoreUndefined: true  
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;