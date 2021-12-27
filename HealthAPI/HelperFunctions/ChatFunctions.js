const  { randomBytes } = require('crypto')
const { MainConnection,ChatsConnection } = require('./DatabaseConnection')

function InsertNewChat(client,doctor){
    const chatId = randomBytes(16).toString('hex')
    const selectSQL ='INSERT INTO chats (chatId,client,doctor) VALUES(?,?,?)'
    const result = MainConnection.query(selectSQL,[chatId,client,doctor])

}
function getChatId(client,doctor){
    const selectSQL = 'SELECT * FROM chats WHERE client = ? AND doctor = ?'
    const result = MainConnection.query(selectSQL,[client,doctor])
    if (result){
        return result[0]?.chatId
    }else {
        return null
    }
}
function InsertNewMessage(chatId,messageInfo){
    const { message,sender,receiver,createdAt,createdOn,isRead,createdAt2 } = messageInfo
    const messageId = randomBytes(16).toString('hex')
    const insertSQL =`INSERT INTO ${chatId} (messageId,message,sender,receiver,createdAt,createdOn,createdAt2,isRead) VALUES (?,?,?,?,?,?,?,?)`
    const result = ChatsConnection.query(insertSQL,[messageId,message,sender,receiver,createdAt,createdOn,createdAt2,isRead])
}
function getChatIDsForClientAccount(client){
    const selectSQL = 'SELECT * FROM chats WHERE client = ?'
    const chats = MainConnection.query(selectSQL,[client])
    const chatIds = chats.map((chat) => chat.chatId)
    return chatIds
}
function getChatIDsForDoctorAccount(doctor){
    const selectSQL = 'SELECT * FROM chats WHERE doctor = ?'
    const chats = MainConnection.query(selectSQL,[doctor])
    const chatIds = chats.map((chat) => chat.chatId)
    return chatIds
}
function getLastChatsForDoctorAccount(doctor){
    const chatIds = getChatIDsForDoctorAccount(doctor)
    const AllLastChatMessages = chatIds.map((chatId) => {
        return getLastChat(chatId)
    })
    return AllLastChatMessages
}
function getLastChatsForClientAccount(client){
    const chatIds = getChatIDsForClientAccount(client)
    const AllLastChatMessages = chatIds.map((chatId) => {
        return getLastChat(chatId)
    })
    return AllLastChatMessages


}
function getLastChat(chatId){
    const selectSQL =`SELECT * FROM ${chatId}`
    const chats = ChatsConnection.query(selectSQL)
    return chats[chats.length -1]

}
function CreateNewChat(chatId){
    const CreateTableSQL =`CREATE TABLE ${chatId} (
    messageId VARCHAR(200),
    message VARCHAR(2000),
    sender VARCHAR(200),
    receiver VARCHAR(200),
    createdAt VARCHAR(200),
    createdOn VARCHAR(200),
    createdAt2 VARCHAR (200),
    isRead BOOLEAN)
    `
    const result =ChatsConnection.query(CreateTableSQL)
}
function getChatMessages(client,doctor){
    const chatId = getChatId(client,doctor)
    const selectSQL = `SELECT * FROM ${chatId}`
    const messages = ChatsConnection.query(selectSQL)
    if (messages){
        return  messages
    }else {
        return []
    }

}
function getClientId(fullname){
    const selectSQL = 'SELECT * FROM users WHERE fullname = ?'
    const result = MainConnection.query(selectSQL,[fullname])
    return result[0].userId
}
function getDoctorId(fullname){
    const selectSQL = 'SELECT * FROM doctor WHERE fullname = ?'
    const result = MainConnection.query(selectSQL,[fullname])
    return result[0].doctorId
}

module.exports={
    InsertNewChat,
    getChatId,
    CreateNewChat,
    InsertNewMessage,
    getChatMessages,
    getLastChatsForClientAccount,
    getLastChatsForDoctorAccount,
    getDoctorId,
    getClientId
}
