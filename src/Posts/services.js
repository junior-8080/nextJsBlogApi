const mongsooe = require('mongoose')

const PostSchema = mongsooe.Schema({
    title: {
        type: String,
        
    },
    description: {
        type:'String',
        
    },
    body:{
        type:String,
      
    },
    status: {
        type:String,
        default: 'NA'
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }


})

module.exports = mongsooe.model('blogPost',PostSchema)
