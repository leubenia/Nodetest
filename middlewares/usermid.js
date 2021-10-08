const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
let secretObj = require("../private/myconkey");


module.exports = (req, res, next) => {
  let token = req.cookies.user;

  if (!token) {
    console.log("여기서잡히네");
    res.status(401).send({
      errorMessage: "로그인후 사용하세요",
    });
    return;
  }
  try {
    const { id } = jwt.verify(token, secretObj.secret);
    console.log(id);
    User.findOne({ id }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(404).send({
      errorMessage: "로그인후 사용하세요",
    });
    return;
  }
};
