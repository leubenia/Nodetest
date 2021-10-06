const User = require("../schemas/user");

const testdodo = async(id, pw, conpw, name) => {
    const exisUsers = await User.find({ id });
    //console.log(exisUsers);
    if (exisUsers) {
      return false;
    }
    
    const exisUsersname = await User.find({ name });
    //console.log(exisUsersname);
    if (exisUsersname) {
      return false;
    }
   
    if (!/^[0-9a-z+]{3,}/gi.test(name)) {
      return false;
    }
    if (!/^[0-9a-z]{4,}/gi.test(pw)) {
      return false;
    }
    var re3 = new RegExp(name, "gi");
    if (re3.test(pw)) {
      return false;
    }
    if (pw !== conpw) {
      return false;
    }
    return true;
}

module.exports = testdodo;

