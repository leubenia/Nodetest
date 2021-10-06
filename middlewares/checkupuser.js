const joi = require("joi");
const User = require("../schemas/user");

const userupjoi = joi.object({
  id: joi.string().required(),
  pw: joi.string().required(),
  conpw: joi.string().required(),
  name: joi.string().required(),
});


module.exports = async(req, res, next) => {
  const { error, value } = userupjoi.validate(req.body);
  const { id, pw, conpw, name } = value;
  
  if (error) {
    res.status(400).send({
      errorMessage: "정확한 값입력요망",
    });
    return;
  }
  const exisUsers = await User.find({ id });
  if (exisUsers) {
    res.status(400).send({
      errorMessage: "이미 가입된 아이디.",
    });
    return;
  }
  const exisUsersname = await User.find({ name });
  if (exisUsersname) {
    res.status(400).send({
      errorMessage: "이미 가입된 닉네임.",
    });
    return;
  }
  if (!/^[0-9a-z+]{3,}/gi.test(name)) {
    res.status(400).send({ errorMessage: "닉네임을 확인하세요" });
    return;
  }
  if (!/^[0-9a-z]{4,}/gi.test(pw)) {
    res
      .status(400)
      .send({
        errorMessage: "비밀번호가 4자 이하거나 닉네임과 같은 값이 있습니다.",
      });
    return;
  }
  var re3 = new RegExp(name, "gi");
  if (re3.test(pw)) {
    res
      .status(400)
      .send({
        errorMessage: "비밀번호가 4자 이하거나 닉네임과 같은 값이 있습니다.",
      });
    return;
  }
  if (pw !== conpw) {
    res.status(400).send({
      errorMessage: "페스워드가 페스워드 확인란과 동일하지 않습니다.",
    });
    return;
  }
  next();
};
