const jwt = require('jsonwebtoken');
const User = require('../schemas/user')

module.exports = (req, res, next)=>{
    let token = req.cookies.user 
    
    if(!token){
        res.status(401).send({
            errorMessage: '로그인후 사용하세요'
        });
        return;
    }
    
    try{
        const { id } = jwt.verify(token, secretObj.secret);
        console.log(id)
        User.findById(id).then((user)=>{
            res.locals.user = user;
            next();
        });
    } catch(error){
        res.status(401).send({
            errorMessage: '로그인후 사용하세요'
        });
        return;
    }
}