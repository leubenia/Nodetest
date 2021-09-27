const express = require("express");
const user = require("../schemas/user");
const v1 = require("uuid")
require('date-utils');

const router = express.Router();

router.get('/login', function(req, res, next) {
   
});

// 로그인 POST
router.post("/login", async(req,res,next)=>{
    let body = req.body;

    const users = await user.findOne({id: body.id });
    console.log(users)
    if(users != null){
        let dbPassword = users["pw"]
        let inputPassword = body.pw;
        //let salt = result.dataValues.salt;
        //let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        if(dbPassword === inputPassword){
            console.log("비밀번호 일치");
            // 세션 설정
            req.session.name = users["name"];
            req.session.save
            console.log(users["name"]);
            console.log(req.session);
            res.redirect("/");
        }
        else{
            console.log("비밀번호 불일치");
            res.send("<script>alert('틀렷네요?');location.href='/';</script>")
        }
    }
    
    
});
//회원가입
router.post("/signup", async(req,res,next) =>{
    const body = req.body;
    let id = body.id;
    let pw = body.pw;
    let name = body.name;
    console.log(body)
    
    await user.create({ id, pw, name})
    .then( result => {
        res.redirect("/")
    })
    .catch( err => {
        console.log(err)
        res.send("<script>alert('다시입력?');location.href='/singup';</script>")
    })
});
router.get("/logout", function(req,res,next){
    req.session.destroy(function(err){});
    res.clearCookie('sid');
    console.log("삭제완료")
    
    res.redirect("/")
});
  


module.exports = router;