const express = require("express");
const user = require("../schemas/user");
let jwt = require("jsonwebtoken");
let secretObj = require("../private/myconkey");
var cookie = require('cookie-parser');
const v1 = require("uuid");
require('date-utils');

const router = express.Router();

router.use(cookie())

router.get("/someAPI", function(req, res, next){
    let token = req.cookies.user
    
    let decoded = jwt.verify(token, secretObj.secret);
    if(decoded){
        console.log(decoded["id"])
        res.send("권한이 있어서 API 수행 가능")
    }
    else{
      res.send("권한이 없습니다.")
    }
})


// 로그인 POST
router.post("/login", async (req, res, next) => {
    let body = req.body;
    user.findOne({ id: body.id })
    .then(users =>{
        console.log(users)
        let token = jwt.sign({ id: users["id"] , name: users["name"] }, secretObj.secret ,{expiresIn: '5m' })
        if (users != null) {
            let dbPassword = users["pw"]
            let inputPassword = body.pw;
            //let salt = result.dataValues.salt;
            //let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
            if (dbPassword === inputPassword) {
                console.log("비밀번호 일치");
                res.cookie("user",token,{maxAge: 300000})
                res.redirect("/");
            }
            else {
                console.log("비밀번호 불일치");
                res.send("<script>alert('틀렷네요?');location.href='/';</script>")
            }
        }
    })
});
//회원가입
router.post("/signup", async (req, res, next) => {
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const name = body.name;
    console.log(body)
    const iswhat = true;
    await user.create({ id, pw, name ,iswhat})
        .then(result => {
            res.redirect("/")
        })
        .catch(err => {
            console.log(err)
            res.send("<script>alert('다시입력?');location.href='/singup';</script>")
        })
});

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