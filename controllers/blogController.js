//ติดต่อกับฐานข้อมูล /ดำเนินการกับฐานข้อมูล
const Blogs = require('../models/blogs')
const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid');
//บันทึกข้อมูล
exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)

    if(!slug){
        slug=uuidv4();
    }
    //ตรวจสอบความถูกต้องของข้อมูล
    switch(true){
        case !title:
            return res.status(400).json({error:'กรุณาป้อนชื่อบทความ'})
            break;
        case !content:
            return res.status(400).json({error:'กรุณาป้อนเนื้อหาบทความ'})
            break;
    }
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:'มีชื่อบทความซ้ำกัน'})
        }
        res.json(blog)
    })


}

//ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

//ดึงข้อมูลแต่ละตัวตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

//ลบข้อมูล
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:'ลบบทความเรียบร้อย'
        })
    })
}

//อัพเดตข้อมูล
exports.update=(req,res)=>{
    const {slug} = req.params
    const {title,content,author}=req.body
    //ส่งข้อมูล =>title, content, author
    
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}