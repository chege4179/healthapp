const { MainConnection } = require('../HelperFunctions/DatabaseConnection')
const { randomBytes } = require('crypto')

function InsertArticle(articleTitle,articlePost,articleCreatedAt,articleCreatedOn,articleBy,articleImageUrl){
    const articleId = randomBytes(16).toString('hex')
    const insertSQL ='INSERT INTO articles(articleId,articleTitle,articlePost,articleBy,articleImageUrl,articleCreatedAt,articleCreatedOn) VALUES (?,?,?,?,?,?,?)'
    const result = MainConnection.query(insertSQL,[articleId,articleTitle,articlePost,articleBy,articleImageUrl,articleCreatedAt,articleCreatedOn])

}
function getAllArticles(){
    const selectSQL = 'SELECT * FROM articles'
    const result = MainConnection.query(selectSQL)
    return result
}

module.exports = { InsertArticle,getAllArticles }
