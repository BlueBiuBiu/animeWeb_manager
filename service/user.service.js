const connection = require("../app/database")

class UserService {
  async getUserList(offset,limit){
    const statement =  `
      SELECT * FROM user LIMIT ?,?;
    `
    const [result] = await connection.execute(statement,[offset,limit])
    return result
  }

  async getSearchList(name,offset,limit){
    const statement = `
      SELECT * FROM user WHERE username  LIKE CONCAT("%",?,"%") LIMIT ?,?;
    `
    const [result] = await connection.execute(statement,[name,offset,limit])
    return result
  }

  async updateUserById(id,password){
    const statement = `
      UPDATE user SET password =? WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[password,id])
  }

  async deleteUserById(id){
    const statement =  `
      DELETE FROM user WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[id])
  }

  async deleteUserCollectById(id,collect){
    const collection = JSON.stringify(collect)
    const statement =  `
      UPDATE user SET collect = ? WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[collection,id])
  }

  async updateAvatar(id,avatar_url){
    const statement = `
      UPDATE user_avatar SET avatar_url = ? WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[avatar_url,id])
  }
}

module.exports = new UserService()