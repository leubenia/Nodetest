const express = require("express");
const write = require("../schemas/write");
const checkloginware = require("../middlewares/usermid")
const checkuseridware = require("../middlewares/userchekmid")
const v1 = require("uuid")
var cookie = require('cookie-parser');

require('date-utils');

const router = express.Router();
router.use(cookie())
router.use((req, res, next) => {
    next();
});

//게시물 조회
router.get("/write", async (req, res, next) => {
    try {
        const { category } = req.query;
        const writes = await write.find({ category }).sort("-writeId");
        res.json({ write: writes });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//게시물 한가지만 조회
router.get("/write/:writeId", async (req, res) => {
    const {writeId} = req.params;
    //const writes = await write.findOne({writeId: writeId });
    const test = await write.findOneAndUpdate(
        {writeId:writeId},
        {
            $push:{
                rewrite:{
                    $each:[], $sort:{_id:-1}
                }
            }
        });
    console.log(test);
    if(test == null){
        res.send({ result: "게시물이존재하지않습니다." });
    }
    else{
        res.json({ detail: test });
    }
});


//게시물 작성
router.post('/write', async(req, res) => {
    const { title, name, body, pw } = req.body;
    test = v1.v1().split('-')
    let writeId = test[2] + test[1] + test[0] + test[3] + test[4]
    let newDate = new Date();
    let date = newDate.toFormat('YYYY,MM,DD HH24:MI:SS')
    try{
        await write.create({ writeId, title, name, body, date, pw });
        res.send({ result: "success" });
    }
    catch (err){
        console.log(err)
        res.send({ result: "err" });
    }
});


//게시물 삭제
router.delete("/write/:writeId", async (req, res) => {
    const { writeId } = req.params;
    const { pw } = req.body;
    const iswrite = await write.find({ writeId });
    if (iswrite.length > 0) {
        if(pw == iswrite[0]["pw"]){
            await write.deleteOne({ writeId });
            res.send({ result: "success" });
        }
        else{
            res.send({result: "err"})
        }
        
    }
})

//게시물 수정
router.patch("/write/:writeId", async (req, res) => {
    const { writeId } = req.params;
    const { title, name, body, pw } = req.body;
    const iswrite = await write.find({ writeId });
    if (iswrite.length > 0) {
        console.log(iswrite[0]["pw"])
        if(pw == iswrite[0]["pw"]){
            await write.updateOne({ writeId }, { $set: { title , name, body} });
            res.send({ result: "success" });
        }
        else{
            res.send({result: "err"})
        }  
    }
})
//댓글 작성
router.post("/rewrite/:writeId", checkloginware ,async(req,res)=>{
    const { writeId } = req.params;
    const { rebody,username } = req.body;
    write.findOne({writeId})
    .then(writes =>{
        if(writes != null){
            let rewrites = writes["rewrite"];
            doc = {rebody: rebody, pw: "123123", username: username}
            rewrites.push(doc)
            console.log(rewrites)
            writes.rewrite = rewrites;
            writes.save();
            res.send({ result: "success" });
        }
        else{
            res.send({result:"err"})
        }
    })
})
//댓글 수정
router.patch("/rewrite/:writeId",checkuseridware ,async(req,res)=>{
    const { writeId } = req.params;
    const { rebody, reid  } = req.body;
    write.findOne({writeId})
    .then(writes =>{
        if(writes != null){
            let rewrites = writes.rewrite.id( reid );
            rewrites.rebody = rebody;
            writes.save();
            res.status(200).send({ result: "success" });
        }
        else{
            res.status(401).send({result:"err"})
        }
    })
})
//댓글 삭제
router.delete("/rewrite/:writeId",checkuseridware ,async(req,res)=>{
    const { writeId } = req.params;
    const { reid } = req.body;
    write.findOne({writeId})
    .then(writes =>{
        if(writes != null){
            let rewrites = writes.rewrite.id(reid);
            rewrites.remove();
            writes.save();
            res.send({ result: "success" });
        }
        else{
            res.send({result:"err"})
        }
    })
})


module.exports = router;