const Express = require('express')
const {InsertMedicalBioInfo, GetMedicalBioById} = require("../HelperFunctions/MedicalBioFunctions");
const router = Express.Router()


router.post('/add',(req,res) => {
    console.log(req.body)
    const { userId,age,dateOfBirth,bio } = req.body
    InsertMedicalBioInfo(req.body)
    return res.json({
        msg:'Your Bio has been updated successfully',
        success:true
    })

})
router.get('/:userId',(req,res) => {
    const userId = req.params.userId
    return res.json({
        bio:GetMedicalBioById(userId),
        success:true
    })

})
router.put('/update',(req,res) => {

})

module.exports = router
