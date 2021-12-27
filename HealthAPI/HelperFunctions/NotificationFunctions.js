const admin = require('firebase-admin')

async function NewMessageNotification(userTokens,fullName,message){
    await admin.messaging().sendToDevice(userTokens,
        {
            notification:{
                body: message,
                title: `${fullName}  has sent a chat`,
                imageUrl:'https://picsum.photos/200/300'
            },
            data:{
                message,
                fullName

            }
        },{
            contentAvailable: true,
            // Required for background/quit data-only messages on Android
            priority: 'high',
        }).then(response => {
        console.log('Successfully sent the new like message:', response);
    })
        .catch(error => {
            console.log('Error sending new like message:', error);
        });
}

module.exports = { NewMessageNotification }
