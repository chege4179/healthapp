const { MainConnection }  =require('./DatabaseConnection')
const { randomBytes } = require('crypto')
const bcrypt = require('bcryptjs')

function IsExistingDoctor(email){
    const selectSQL = 'SELECT * FROM doctor WHERE email = ?'
    const result = MainConnection.query(selectSQL,[email])
    return result.length > 0;
}
function InsertNewDoctor(user){
    const { email,fullName,password,phoneNumber,speciality } = user
    const salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password,salt)
    const userId = randomBytes(16).toString('hex')
    const insertSQL='INSERT INTO doctor(doctorId,fullName,email,phonenumber,speciality,password) VALUES (?,?,?,?,?,?)'
    const result = MainConnection.query(insertSQL,[userId,fullName,email,phoneNumber,speciality,hashpassword])


}
function AuthenticateDoctor(email,password){
    const selectSQL = 'SELECT * FROM doctor WHERE email = ?'
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
function InsertNewDeviceId(doctorId,deviceId){
    const id = randomBytes(16).toString('hex')
    const insertSQL='INSERT INTO doctordeviceid(id,doctorId,deviceId) VALUES (?,?,?)'
    const result = MainConnection.query(insertSQL,[id,doctorId,deviceId])

}
function getDoctorId(email){
    const selectSQL = 'SELECT * FROM doctor  WHERE email = ?'
    const result = MainConnection.query(selectSQL,[email])
    if (result.length > 0){
        return result[0].doctorId
    }else {
        return null
    }
}
function getAllDoctors(){
    const selectSQL ='SELECT * FROM doctor'
    const result = MainConnection.query(selectSQL)
    return result
}
function InsertMedicalBio(doctorId,bio){

}

module.exports = { IsExistingDoctor,InsertNewDoctor,
    AuthenticateDoctor,InsertNewDeviceId,
    getDoctorId,getAllDoctors }
