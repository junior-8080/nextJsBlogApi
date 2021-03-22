const createUser = require('../accounts/services')
const {hashPassword, comparePassword} = require('../utils')


function verifyUserName(req, res, next) {

    createUser.find({username: req.body.username}).then(result => {
        if (result[0]) {
            return res.json({
                statusCode: 304,
                message: 'INALID INPUT',
                data: {
                    message: 'User already exits'
                }
            })
        } else {
            next()
        }


    }).catch(err => {
        console.log(err)
        return res.json({statusCode: 500, message: 'Internal Sever Error'})
    })
}

function encryptPassword(req, res, next) {

    hashPassword(req.body.password).then(result => {
        req.body.password = result
        next()

    }).catch(err => {
        console.log(err)
        return res.json({statusCode: 500, message: 'Internal Server Error'})
    })
}

function newUser(req, res) {

    const user = new createUser({
        username: req.body.username,
        password: req.body.password,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        email: req.body.email
    })

    user.save().then(result => {
        return res.json({
            statusCode:304 ,
            message: "SUCCESS",
            data: {
                postId: result._id,
                message: 'CREATED'
            }
        })
    })

}


const login = (req, res) => {
    createUser.find({username: req.body.username}).then(result => {
      console.log(result)
        let user = result[0]
        if (user) {
            comparePassword(req.body.password, user.password).then(result => {
                if (result) {
                    return res.json({
                        statusCode: 200,
                        message: 'SUCCESS',
                        data: {
                            name: user.username,
                            email: user.email,
                            twitter: user.twitter,
                            instagram: user.instagram
                        }
                    })
                }
            })
        }else {
          return res.json({
            statusCode: 304,
            message: 'INVALID',
            data: {
                message: 'invalid Username or Password '
            }
          }) 
        }
        
    })
}

function getUsers(){
 createUser.find({})
 .then(result => {
     console.log(result)
 })
}
module.exports = {
    newUser,
    encryptPassword,
    verifyUserName,
    login,
    getUsers
}
