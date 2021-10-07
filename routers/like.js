const express = require("express");
const write = require("../schemas/write");
var cookie = require("cookie-parser");
const usercheck = require("../middlewares/usermid")

require("date-utils");

const router = express.Router();
router.use(cookie());
router.use((req, res, next) => {
  next();
});




function checklike(req,res,write, name ,dolike){
    try {
        if(dolike == null){
            doc = {like : 1, dslike: 0 ,name: name}
            dolike.push(doc);
            write.like = dolike;
            write.save();
            res.status(200).send({result : "오홓홍조아요"})
        }
        else {
            let a = dolike["like"];
            if(a){
                res.status(400).send({err : "더블좋아요..!"});
            }
            write.dslike = "0";
            write.like = "1";
            write.save();
            res.status(200).send({result : "오홓홍조아요"})
        }
    } catch (error) {
        res.status(400).send({err : "알수없는에러"})
        console.log(error)
    }
    
}
//싫어요
function checkdslike(write, name ,dolike) {
    try {
        if(dolike == null){
            dolike.push({like : false, dslike: true ,name: name});
            write.like = dolike;
            write.save();
            res.status(200).send({result : "싫어..?"})
        }
        else {
            let a = dolike["dslike"];
            if(a){
                res.status(400).send({errorMessage : "더블싫어??!"});
            }
            write.dslike = true;
            write.like = false;
            write.save();
            res.status(200).send({result : "시러!?"})
        }
    } catch (error) {
        res.status(400).send({errorMessage : "알수없는에러"})
    }
    
}




router.patch("/like/:writeId", usercheck ,async (req, res) => {
  const { writeId } = req.params;
  const { like, dslike, name , likeid} = req.body;
  const { user } = res.locals;
  console.log(user.name);
  console.log(like, dslike, name, writeId, likeid);
  try {
    await write.findOne({ writeId }).then((wites) => {
        let dolike = wites.like.id(likeid);
        if(like){
           if(dolike){
               if(dolike['like']){
                   console.log("좋아요가 눌려져있엇어!")
                   dolike.remove();
                   wites.save();
                   res.status(200).send({ msg: "좋아요 ㅠ 취소" });
                   return;
               }else{
                   console.log("싫어요였네")
                   dolike.like = true;
                   wites.save();
                   res.status(200).send({ msg: "오호호홍 조아용" });
                   return;
               }
           }
           else {
                console.log("새로만들어야지!")
                let list = wites["like"];
                doc = {like : true, name: name}
                list.push(doc)
                wites.like = list;
                wites.save();
                res.status(200).send({ msg: "오호호홍 조아용" });
                return;
           }
        }
        if(dslike){
            if(dolike){
                if(!dolike['like']){
                    console.log("싫어요 ㅠ!")
                    dolike.remove();
                    wites.save();
                    res.status(200).send({ msg: "오호 싫어요를 취소하였군요!" });
                    return;
                }else{
                    console.log("싫어요였네")
                    dolike.like = false;
                    wites.save();
                    res.status(200).send({ msg: "시..시러요" });
                    return;
                }
            }
            else {
                 console.log("새로만들어야지!")
                 let list = wites["like"];
                 doc = {like : false, name: name}
                 list.push(doc)
                 wites.like = list;
                 wites.save();
                 res.status(200).send({ msg: "시러요..." });
                 return;
            }
        }
        res.status(400).send({ errorMessage: "비정상적 접근...!" });
        return;
    });
    
  } catch (error) {
    res.status(400).send({ errorMessage: "비정상적 접근...!" });
    console.log(error)
  }
});

module.exports = router;
