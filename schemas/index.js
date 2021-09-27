const mongoose = require("mongoose");

const connect = () => {
  mongoose
  //mongodb://localhost:27017/voyage
    .connect("mongodb://dodo:dodo1@3.34.53.209:27017/voyage?authSource=admin", {
        useNewUrlParser: true, 
        ignoreUndefined: true  
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;