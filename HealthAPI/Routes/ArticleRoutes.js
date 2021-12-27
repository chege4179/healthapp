
const Express = require('express')
const router = Express.Router()
const { InsertArticle, getAllArticles } = require('../HelperFunctions/ArticleFunctions')
const cloudinary = require('cloudinary').v2
const peter = ""

router.post('/add',async (req,res) => {
    const articlePhoto = req.files.photo
    const articleImageUrl = await UploadArticleImage(articlePhoto.tempFilePath,articlePhoto.name)
    const { articleTitle,articlePost,articleCreatedAt,articleCreatedOn,articleBy } = req.body
    InsertArticle(articleTitle,articlePost,articleCreatedAt,articleCreatedOn,articleBy,articleImageUrl.secure_url)
    return res.json({
        msg:'Article Created Successfully',
        success:true
    })
})
router.get('/all',(req,res) => {
    return res.json({
        msg:'Articles fetched successfully',
        articles:getAllArticles()
    })
})
module.exports = router
function UploadArticleImage(articlePosterPath,articlePosterName){
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(articlePosterPath,
            {
                resource_type: "image",
                public_id: `healthApp/${articlePosterName}`,
                chunk_size: 6000000,
                eager_async: true,
                eager_notification_url: "https://mysite.example.com/notify_endpoint"
            },
            (error, result) => {

                if (error){
                    reject(error)
                    console.log("Error >>>",error)
                    //UploadArticleImage(articlePosterPath,articlePosterName)
                    return error
                }else {
                    resolve(result)
                }
            });
    })
}

