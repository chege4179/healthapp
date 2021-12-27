const {MainConnection} = require("./DatabaseConnection");


function getClientDeviceIDs(clientId){
    const selectSQL = 'SELECT * FROM userdeviceid WHERE userId =?'
    const result = MainConnection.query(selectSQL,[clientId])
    const deviceIds = result.map((row) => row.deviceId)
    return deviceIds
}
function getDoctorDeviceIDs(doctorId){
    const selectSQL = 'SELECT * FROM doctordeviceid WHERE doctorId =?'
    const result = MainConnection.query(selectSQL,[doctorId])
    const deviceIds = result.map((row) => row.deviceId)
    return deviceIds
}

module.exports = { getClientDeviceIDs,getDoctorDeviceIDs }
