const connection = require("../app/database")

class PictureService {
  async uploadPicture(filename,mimetype,size,user_id){
    const statement = `
    INSERT INTO picture (filename,mimetype,size,user_id) VALUES (?,?,?,?);
  `
  const [result] = await connection.execute(statement,[filename,mimetype,size,user_id])
  return result
  }

  async getPictureById(user_id,filename){
    const statement = `
      SELECT * FROM picture WHERE user_id = ? AND filename = ?;
    `
    const [result] = await connection.execute(statement,[user_id,filename])
    return result[0]
  }
}

module.exports = new PictureService()