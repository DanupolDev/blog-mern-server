const express = require('express')
const router = express.Router()
const {create,getAllblogs,singleBlog,remove,update} = require('../controllers/blogController')
const {verifyToken} = require('../controllers/authController')


router.post('/create',verifyToken,create)
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',verifyToken,remove)
router.put('/blog/:slug',verifyToken,update)

module.exports = router