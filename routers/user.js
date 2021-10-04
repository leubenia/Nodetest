const express = require("express");
const user = require("../schemas/user");
const checkloginware = require("../middlewares/usermid")
let jwt = require("jsonwebtoken");
let secretObj = require("../private/myconkey");
var cookie = require('cookie-parser');
const joi = require("joi");
const crypto = require('crypto');
require('date-utils');

const router = express.Router();

router.use(cookie())


//아이디 찾기
router.get("/userid/:id", async(req, res, next)=> {
    const {id} = req.params;
    const writes = await user.findOne({id: id });
    if(writes == null){
        res.send({ result: "do" });
    }
    else{
        res.send({ result: "err" });
    }
});

// 로그인 POST
router.post("/login", async (req, res, next) => {
    let body = req.body;
    user.findOne({ id: body.id })
    .then(users =>{
        console.log(users)
        if (users != null) {
            let token = jwt.sign({ id: users["id"] , name: users["name"] }, secretObj.secret ,{expiresIn: '5m' })
            let dbPassword = users["pw"]
            let inputPassword = body.pw;
            let salt = users["salt"];
            let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
            if (dbPassword === hashPassword) {
                console.log("비밀번호 일치");
                res.cookie("user",token,{maxAge: 300000})
                res.status(200).send({});
            }
            else {
                console.log("비밀번호 불일치");
                res.status(400).send({
                    errorMessage: "아이디 또는 비밀번호가 틀러요 아저씨!",})
            }
        }
        else{
            console.log("아이디 없음");
            res.status(400).send({
                errorMessage: "아이디 또는 비밀번호가 틀러요 아저씨!",})
        }
    })
});

//회원가입 
const userupjoi = joi.object({
    id: joi.string().required(),
    pw: joi.string().required(),
    conpw: joi.string().required(),
    name: joi.string().required(),
  });
router.post("/upusers", async (req, res) => {
    const { error, value } = userupjoi.validate(req.body);
    const { id, pw, conpw, name } = value;
  
    if (error) {
      res.status(400).send({
        errorMessage: "정확한 값입력요망",
      });
      return;
    }
    console.log(name);
    if(!/^[0-9a-z+]{3,}/gi.test(name)){
        res.status(400).send({ errorMessage : "닉네임을 확인하세요"})
        return;
    }
    if(!/^[0-9a-z]{4,}/gi.test(pw)){
        res.status(400).send({ errorMessage :"비밀번호가 4자 이하거나 닉네임과 같은 값이 있습니다."})
        return;
    }
    var re3 = new RegExp(name, 'gi');
    if(re3.test(pw)){
        res.status(400).send({ errorMessage :"비밀번호가 4자 이하거나 닉네임과 같은 값이 있습니다."})
        return;
    }
    if (pw !== conpw) {
      res.status(400).send({
        errorMessage: "페스워드가 페스워드 확인란과 동일하지 않습니다.",
      });
      return;
    }
    const exisUsers = await user.find({id});
    if (exisUsers.length) {
      res.status(400).send({
        errorMessage: "이미 가입된 아이디.",
      });
      return;
    }
    const exisUsersname = await user.find({name});
    if (exisUsersname.length) {
        res.status(400).send({
          errorMessage: "이미 가입된 닉네임.",
        });
        return;
      }
    
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    const ispw = crypto.createHash("sha512").update(pw + salt).digest("hex");
    const iswhat = false;
    console.log(id, ispw, name ,iswhat, salt)
    await user.create({ id, pw : ispw, name ,iswhat, salt});
  
    res.status(200).send({});
  });


//유저 체크
router.get("/checkid",checkloginware ,async(req, res)=>{
    res.status(200).send({doit : "로그인이 되어 있습니다."})
})




//어드민용 유저리스트
router.get("/userlist", async(req, res, next)=> {
    const admin = req.cookies.user;
    const decoded = jwt.verify(admin, secretObj.secret);
    console.log(decoded["id"]+"접근")
    user.findOne({ id: decoded["id"] })
    .then(users =>{
        if (users != null) {
            if(users["iswhat"]){
                user.find({}).then(list =>{
                    res.json({list : list})
                })   
            }
            else{
                res.redirect("/")
            }
        }
    })
    
});



//세션사용 로그아웃
router.get("/logout", function (req, res, next) {
    req.session.destroy(function (err) { });
    res.clearCookie('sid');
    console.log("삭제완료")

    res.redirect("/")
});



router.post("/Nontestsessen", async (req, res, next) => {
    let body = req.body;

    user.findOne({ id: body.id })
    .then(users =>{
        console.log(users)
        if (users != null) {
            let dbPassword = users["pw"]
            let inputPassword = body.pw;
            //let salt = result.dataValues.salt;
            //let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

            if (dbPassword === inputPassword) {
                console.log("비밀번호 일치");
                // 세션 설정
                req.session.name = users["name"];
                req.session.save
                console.log(users["name"]);
                console.log(req.session);
                res.redirect("/");
            }
            else {
                console.log("비밀번호 불일치");
                res.send("<script>alert('틀렷네요?');location.href='/';</script>")
            }
        }
    })
});

module.exports = router;