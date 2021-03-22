const mongsooe = require('mongoose')

const UserSchema = mongsooe.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type:'String',
        required:true,
    },
   twitter :{
        type:String
    },
    instagram: {
        type:String
    },
    email:{
        type:String
    },
    role: {
        type:String,
        default:'A'
    }


})

module.exports = mongsooe.model('UserSchema',UserSchema)
