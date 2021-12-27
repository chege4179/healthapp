const Express = require('express')
const {IsExistingDoctor, InsertNewDoctor, AuthenticateDoctor, InsertNewDeviceId, getDoctorId, getAllDoctors} = require("../HelperFunctions/DoctorFunctions");

const router  = Express.Router()


router.post('/login',(req,res) => {
    console.log('request made')
    console.log(req.body)
    const { email,password,deviceId } = req.body
    console.log(deviceId.length)
    if (email === undefined || password === undefined){
        return res.json({
            msg:'Bad Request',
            success:false
        })
    }else {
        const resp = AuthenticateDoctor(email,password)
        const doctorId = getDoctorId(email)
        if (resp.success){
            InsertNewDeviceId(doctorId,deviceId)
        }
        return res.json(resp)
    }

})
router.post('/signup',(req,res) => {

    const { email,fullName,password,phoneNumber,speciality } = req.body
    if (email ===undefined || fullName===undefined || speciality === undefined ||
        password===undefined || phoneNumber === undefined ){
        return res.status(400).json({
            msg:'Bad Request',
            success:false
        })
    }else {
        if (IsExistingDoctor(email)){
            return res.status(200).json({
                msg:'A user with this email already exists',
                success:false
            })
        }else {
            InsertNewDoctor(req.body)
            return res.json({
                msg:'New User added successfully',
                success:true
            })

        }

    }
})
router.get('/all',(req,res) => {
    return res.json({
        msg:'All Doctors fetched successfully',
        doctors:getAllDoctors()
    })
})
module.exports = router
