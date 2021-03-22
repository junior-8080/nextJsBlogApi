const express = require("express");
const { formPost,getPosts,getPost,editPost,deleteAll } = require("./Posts/controllers");
const { newUser ,encryptPassword,verifyUserName,login, getUsers} = require("./accounts/controllers");
const router = express.Router()


router.post('/posts',formPost)
router.get('/posts',getPosts)
router.get('/posts/:postId',getPost)
router.put('/posts',editPost)
router.post('/user',verifyUserName,encryptPassword,newUser)
router.get('/users',getUsers)
router.post('/login',login)
router.delete('/posts',deleteAll)

module.exports =  router
