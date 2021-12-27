const Express = require('express')
const {IsExistingUser, InsertNewUser, AuthenticateUser, getUserId, InsertNewDeviceId, getAllUsers} = require("../HelperFunctions/UserFunctions");
const router  = Express.Router()


router.post('/login',(req,res) => {
    console.log(req.body)
    const { email,password,deviceId } = req.body
    console.log(deviceId.length)
    if (email === undefined || password === undefined){
        return res.json({
            msg:'Bad Request',
            success:false
        })
    }else {
        const resp = AuthenticateUser(email,password)
        const userId = getUserId(email)
        if (resp.success){
            InsertNewDeviceId(userId,deviceId)
        }
        return res.json(resp)
    }
})
router.post('/signup',(req,res) => {
    console.log(req.body)
    const { email,fullName,password,phoneNumber } = req.body

    if (email ===undefined || fullName===undefined ||
        password===undefined || phoneNumber === undefined ){
        return res.status(400).json({
            msg:'Bad Request',
            success:false
        })
    }else {
        if (IsExistingUser(email)){
            return res.status(200).json({
                msg:'A user with this email already exists',
                success:false
            })
        }else {
            InsertNewUser(req.body)
            return res.json({
                msg:'New User added successfully',
                success:true
            })

        }

    }

})
router.get('/all',(req,res) => {
    return res.json({
        users:getAllUsers()
    })
})
module.exports = router
