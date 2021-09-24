const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const connect = require('./schemas')
connect();
app.use(express.static('public'));


const writeRouter = require("./routers/write");
app.use("/api", [writeRouter]);

app.use((req, res, next) => {
  console.log(req);
  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//첫페이지 게시물 확인
app.get('/', (req, res, next) => {
  res.render('index')
});

//게시물 한가지
app.get('/write',(req, res)=>{
    let num = req.query.name;
    res.render('detaill',{num})
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


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})