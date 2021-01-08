const connection = require("../app/database")
const commentRouter = require("../router/comment.router")

class AnimeService {
  async create(userId, content, animeId,commentId) {
    const statement = `
      INSERT INTO comment(content,anime_id,user_id,comment_id) VALUES(?,?,?,?);
    `
    const [result] = await connection.execute(statement, [content, animeId, userId,commentId])
    return result
  }

  async getCommentListByAnimeId(animeId){
    const statement = `
      SELECT c.id id, c.content content, c.comment_id comment_id, c.createAt createTime,
      c.thumb_up thumb_up, c.thumb_down thumb_down,
      JSON_OBJECT("id",u.id,"username",u.username,"avatar",ua.avatar_url) user
      FROM comment c
      LEFT JOIN user u ON c.user_id = u.id
      LEFT JOIN user_avatar ua on c.user_id = ua.id
      WHERE c.anime_id = ?
      ORDER BY createAt DESC;
    `
    const [result] = await connection.execute(statement,[animeId])
    return result
  }

  async thumbUpAdd(commentId,userId){
    const statement = `
      UPDATE comment SET thumb_up = thumb_up + 1 
      WHERE id = ?; 
    `
    const statement1 = `
      INSERT user_thumbup (comment_id,user_id)
      VALUES (?,?);
    `
    const [result] = await connection.execute(statement,[commentId])
    const [result1] = await connection.execute(statement1,[commentId,userId])
  }

  async thumbDownAdd(commentId,userId){
    const statement = `
      UPDATE comment SET thumb_down = thumb_down + 1 
      WHERE id = ?; 
    `
    const statement1 = `
      INSERT user_thumbdown (comment_id,user_id)
      VALUES (?,?);
    `
    const [result] = await connection.execute(statement,[commentId])
    const [result1] = await connection.execute(statement1,[commentId,userId])
  }
}

module.exports = new AnimeService()