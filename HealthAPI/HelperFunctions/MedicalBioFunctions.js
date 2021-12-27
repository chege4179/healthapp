const { MainConnection } = require('../HelperFunctions/DatabaseConnection')


function InsertMedicalBioInfo(info){
    const { userId,age,dateOfBirth,bio } = info
    const insertSQL ='INSERT INTO medicalbio(userId,age,dateOfBirth,bio) VALUES (?,?,?,?)'
    const result = MainConnection.query(insertSQL,[userId,age,dateOfBirth,bio])

}
function GetMedicalBioById(userId){
    const selectSQL = 'SELECT * FROM medicalbio WHERE userId = ?'
    const result = MainConnection.query(selectSQL,[userId])
    return result[result.length -1]


}

const myObj = {
    name:'Peter',
    age:20,
    add:(a,b) => {
        return a+ b
    }
}


module.exports = { InsertMedicalBioInfo,GetMedicalBioById }
