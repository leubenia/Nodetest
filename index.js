const express = require('express')
const cookieParser = require('cookie-parser');
const secretObj = require("./private/myconkey");
const jwt = require("jsonwebtoken");
const session = require('express-session');
const app = express()
const port = 3000
app.use("/public", express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const connect = require('./schemas')
connect();
app.use(express.static('public'));


const writeRouter = require("./routers/write");
app.use("/api", [writeRouter]);
const likedodo = require("./routers/like");
app.use("/love", [likedodo]);

//이건 세션
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

app.use(cookieParser())
app.use((req, res, next) => {
  if(req.cookies.user != null){
    let decoded = jwt.verify(req.cookies.user, secretObj.secret);
    res.locals.mysess = decoded["name"];

  }
  else{
    res.locals.mysess = ""
  }
  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//첫페이지 게시물 확인
app.get('/', (req, res, next) => {
  
  res.render('index')
});

//test해더
app.get('/header',(req, res)=>{
  res.render('header')
})

//게시물 한가지
app.get('/write',(req, res)=>{
    let num = req.query.name;
    res.render('write',{num})
})

//게시물 올리기
app.get('/upwrite',(req, res)=>{
    res.render('upwrite')
})

//게시물 삭제,수정
app.get('/delwrite',(req, res)=>{
    let num = req.query.name;
    res.render('delwrite',{num})
})

//회원가입
app.get('/singup',(req, res)=>{
  res.render('singup')
})


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})