const connection = require("../app/database")

class AvatarService{
  async uploadAvatar(filename,mimetype,size,user_id){
    const statement = `
      INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);
    `
    const [result] = await connection.execute(statement,[filename,mimetype,size,user_id])
    return result
  }

  async getAvatarById(user_id){
    const statement = `
      SELECT * FROM avatar WHERE user_id = ?;
    `
    const [result] = await connection.execute(statement,[user_id])
    return result.pop()
  }

  async getAvatarUrlById(user_id){
    const statement = `
      SELECT ua.avatar_url avatar_url,
      IF(count(utu.comment_id),
      JSON_ARRAYAGG(utu.comment_id),null) thumb_up_ids,
      (SELECT 
      JSON_ARRAYAGG(utd.comment_id) 
      FROM user_thumbdown utd 
      LEFT JOIN user cu ON cu.id = utd.user_id
      WHERE utd.user_id = u.id) thumb_down_ids
      FROM user u 
      LEFT JOIN user_avatar ua ON ua.id = u.id
      LEFT JOIN user_thumbup  utu ON u.id = utu.user_id
      WHERE u.id = ?
      GROUP BY u.id;
    `
    const [result] = await connection.execute(statement,[user_id])
    return result
  }

  async getAvatarUrl(){
    const statement = `
      SELECT * FROM user_avatar;
    `
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new AvatarService()