const Express = require('express')
const app = Express()
const admin = require('firebase-admin')
const serviceAccount = require('./healthapp-16ce0-firebase-adminsdk-ylyji-c87d14101d.json')
const cors = require('cors')
const BodyParser = require('body-parser')
const FileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
app.use(FileUpload({ useTempFiles:true }))
app.use(cors())
app.use(BodyParser.json())

const UserRoutes = require('./Routes/UserRoutes')
const DoctorRoutes = require('./Routes/DoctorRoutes')
const ChatRoutes = require('./Routes/ChatRoutes')
const ArticleRoutes = require('./Routes/ArticleRoutes')
const MedicalBioRoutes = require('./Routes/MedicalBioRoutes')

app.use('/user',UserRoutes)
app.use('/doctor',DoctorRoutes)
app.use('/chat',ChatRoutes)
app.use('/article',ArticleRoutes)
app.use('/bio',MedicalBioRoutes)

app.listen(9000,() => console.log('Server Started on PORT 9000'))
const APP_ID = '0e3b7227-6f92-4c72-9a5a-07ff110af7af'
