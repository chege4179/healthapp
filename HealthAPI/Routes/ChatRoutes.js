const Express = require('express')
const {InsertNewChat, getChatId, InsertNewMessage, getChatMessages, CreateNewChat, getLastChatsForClientAccount,
    getLastChatsForDoctorAccount, getClientId, getDoctorId
} = require("../HelperFunctions/ChatFunctions");
const {NewMessageNotification} = require("../HelperFunctions/NotificationFunctions");
const {getClientDeviceIDs, getDoctorDeviceIDs} = require("../HelperFunctions/DeviceIdFunctions");

const router = Express.Router()


router.post('/new',(req,res) => {
    console.log('Request for new chat')
    const { client,doctor,message } = req.body
    console.log(message)
    const chatId = getChatId(client,doctor)
    if (chatId === undefined){
        InsertNewChat(client,doctor)
        const newChatId = getChatId(client,doctor)
        CreateNewChat(newChatId)
        InsertNewMessage(newChatId,message)
        if (message.receiver ===client){
            const clientId = getClientId(client)
            const userTokens = getClientDeviceIDs(clientId)
            NewMessageNotification(userTokens,client,message.message)
        }else if (message.receiver === doctor){
            const doctorId = getDoctorId(doctor)
            const userTokens = getDoctorDeviceIDs(doctorId)
            NewMessageNotification(userTokens,doctor,message.message)
        }

    }else {
        InsertNewMessage(chatId,message)
        if (message.receiver ===client){
            const clientId = getClientId(client)
            const userTokens = getClientDeviceIDs(clientId)
            NewMessageNotification(userTokens,client,message.message)
        }else if (message.receiver === doctor){
            const doctorId = getDoctorId(doctor)
            const userTokens = getDoctorDeviceIDs(doctorId)
            NewMessageNotification(userTokens,doctor,message.message)
        }
    }



    return res.json({
        msg:'Chat created successfully'
    })

})
router.post('/addMessage',(req,res) => {
    console.log('Request for add message')
    const { client,doctor } = req.query
    const { message } = req.body
    const chatId = getChatId(client,doctor)
    InsertNewMessage(chatId,message)
    return res.json({
        msg:'Message sent '
    })
})
router.post('/chatHomeMessages',(req,res) => {
    const { userType,fullname } = req.body
    if (userType ==='client'){
        return res.json({
            msg:'success',
            chats:getLastChatsForClientAccount(fullname)
        })
    }else if (userType ==='doctor'){
        return res.json({
            msg:'success',
            chats:getLastChatsForDoctorAccount(fullname)
        })
    }

})
router.get('/all',(req,res) => {
    const { client,doctor } = req.query
    return res.json({
        msg:'Chats Fetched successfully',
        messages:getChatMessages(client,doctor)
    })
})


module.exports = router
