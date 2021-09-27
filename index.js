const express = require('express')
var cookieParser = require('cookie-parser');
const expresslayouts = require('express-ejs-layouts')
const session = require('express-session');
const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const connect = require('./schemas')
connect();
app.use(express.static('public'));


const writeRouter = require("./routers/write");
app.use("/api", [writeRouter]);

app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));
const userRouter = require("./routers/user");
app.use("/userdo", [userRouter]);
app.use((req, res, next) => {
  
  next();
});
// router.get('/login', function(req, res, next) {
//     let session = req.session;

//     res.render("user/login", {
//         session : session
//     });
// });

// app.use(expresslayouts);

// app.set('index','index');
// app.set("layout extractScripts", true);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//첫페이지 게시물 확인
app.get('/', (req, res, next) => {
  let sessiondo = req.session;
  res.render('index',{sessiondo})
});

//test해더
app.get('/header',(req, res)=>{
  let sessiondo = req.session;
  console.log(sessiondo)
  res.render('header',{sessiondo})
})

//게시물 한가지
app.get('/write',(req, res)=>{
    let num = req.query.name;
    let sessiondo = req.session;
    res.render('write',{num})
})

//게시물 올리기
app.get('/upwrite',(req, res)=>{
  let sessiondo = req.session;
    res.render('upwrite',{sessiondo})
})

//게시물 삭제,수정
app.get('/delwrite',(req, res)=>{
    let num = req.query.name;
    let sessiondo = req.session;
    res.render('delwrite',{num})
})

//회원가입
app.get('/singup',(req, res)=>{
  let sessiondo = req.session;
  res.render('singup',{sessiondo})
})


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})