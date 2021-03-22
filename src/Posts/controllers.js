const Post = require('../Posts/services')



function formPost(req,res){ 
  
   const post  = new Post({
    title:req.body.title,
    description : req.body.description,
    paragraph1: req.body.paragraph1
   })

   post.save()
   .then(result => {
       return res.json({
         statusCode:200,
         message:"SUCCESS",
         data :{
           postId: result._id,
           message:'CREATED'
         }
       })
   })

}


function getPosts(req,res){
  // console.log('...')
  Post.find({})
  .then(result => {
    return res.json({
      statusCode:200,
      message:'SUCCESS',
      data:result
    })
  })
  .catch(err => {
    console.log(err)
    return res.json({
      statusCode:500,
      message:'Internal Sever Error',
    
    })
  })
 
}


function getPost(req,res){

  Post.findById(req.params.postId)
  .then(result => {
    console.log(result)
    return res.json({
      statusCode:200,
      message:'SUCCESS',
      data : result
    })
  })
}

function deleteAll(req,res){

 Post.deleteMany({})
 .then(result => {
  //  console.log(result)
   return res.json({
     statusCode:200,
     message:'SUCCESS',
     data:{
        message:'deleted'
     }
   })
 })
}

function editPost(req,res){
  //  console.log(req.body)
  //  process.exit()
  Post.updateOne({_id:req.body.id},{$set:{'body':req.body.body}})
  .then(result => {
   
    // process.exit()
    if(result.n === 1){
      res.json({
        statusCode:200,
        message:"SUCCESS",
        body:{
          postId: req.params.postId,
          message:'UPDATED'
        }
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
}




module.exports = {
  getPosts,
  getPost,
  formPost,
  editPost,
   deleteAll
}

