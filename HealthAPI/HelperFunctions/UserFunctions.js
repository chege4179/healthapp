const { MainConnection }  =require('./DatabaseConnection')
const { randomBytes } = require('crypto')
const bcrypt = require('bcryptjs')

function IsExistingUser(email){
    const selectSQL = 'SELECT * FROM users WHERE email = ?'
    const result = MainConnection.query(selectSQL,[email])
    return result.length > 0;
}
function InsertNewUser(user){
    const { email,fullName,password,phoneNumber } = user
    const salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password,salt)
    const userId = randomBytes(16).toString('hex')
    const insertSQL='INSERT INTO users(userId,fullName,phonenumber,email,password) VALUES (?,?,?,?,?)'
    const result = MainConnection.query(insertSQL,[userId,fullName,phoneNumber,email,hashpassword])


}
function AuthenticateUser(email,password){
    const selectSQL = 'SELECT * FROM users WHERE email = ?'
    const users = MainConnection.query(selectSQL,[email])
    if (users.length > 0){
        if (bcrypt.compareSync(password,users[0]?.password)){
            return {
                msg:'Login Successful',
                success: true,
                user:users[0]
            }
        }else {
            return {
                msg:'Wrong Password....Please try again',
                success: false,

            }
        }
    }else {
        return {
            msg:'This user does not exist',
            success:false
        }
    }
}
function InsertNewDeviceId(userId,deviceId){
    const id = randomBytes(16).toString('hex')
    const insertSQL='INSERT INTO userdeviceid(id,userId,deviceId) VALUES (?,?,?)'
    const result = MainConnection.query(insertSQL,[id,userId,deviceId])

}
function getUserId(email){
    const selectSQL = 'SELECT * FROM users  WHERE email = ?'
    const result = MainConnection.query(selectSQL,[email])
    if (result.length > 0){
        return result[0].userId
    }else {
        return null
    }
}
function getAllUsers(){
    const selectSQL = 'SELECT * FROM users'
    const result = MainConnection.query(selectSQL)
    return result
}
module.exports = { IsExistingUser,InsertNewUser,AuthenticateUser,InsertNewDeviceId,getUserId,getAllUsers }
