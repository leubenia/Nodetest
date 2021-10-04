const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const Wirte = require("../schemas/write");
let secretObj = require("../private/myconkey");

module.exports = (req, res, next) => {
  const { writeId } = req.params;
  const { reid } = req.body;
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
        Wirte.findOne({ writeId }).then((wirtes) =>{
            let rewrites = wirtes.rewrite.id( reid );
            console.log(rewrites.username ,user.name)
            if(rewrites.username == user.name){
                next();
            }
            else{
                res.status(404).send({
                    errorMessage: "작성자 본인이 아닌거같은데!?",
                  });
            }
        })
    });
  } catch (error) {
    res.status(404).send({
      errorMessage: "작성자 본인이 아닌거같은데!?",
    });
    return;
  }
};
