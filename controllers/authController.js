const jwt = require('jsonwebtoken')
const {expressjwt:expressjwt} = require('express-jwt');

exports.login=(req,res)=>{
    //ข้อมูล username,pasword
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
        //เข้าสู่ระบบ
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }else{
       return res.status(400).json({error:'รหัสผ่านไม่ถูกต้อง!'})
}
}
//ตรวจสอบ token
// exports.requireLogin = expressjwt({
//     secret : Buffer.from(`${process.env.JWT_SECRET}`, "base64"),
//     algorithms: ["HS256"], //มีหลายตัวให้เลือกใช้
//     userProperty : "auth"
// })

exports.verifyToken = (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        return res.status(403).send('A token is required for authentication')

    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
    } catch(err){
        return res.status(401).send('Invalid Token')
    }

    return next()
}
// module.exports = verifyToken