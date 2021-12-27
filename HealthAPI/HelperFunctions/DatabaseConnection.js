const SyncMySQL = require('sync-mysql')

const MainConnectionConfig = {
    host:'localhost',
    user:'root',
    password:'',
    database:'healthapp'
}
const ChatsConnectionConfig = {
    host:'localhost',
    user:'root',
    password:'',
    database:'healthappchats'
}

const MainConnection = new SyncMySQL(MainConnectionConfig)
const ChatsConnection = new SyncMySQL(ChatsConnectionConfig)

module.exports = { MainConnection,ChatsConnection }
