const connection = require("../app/database")

class AnimeService {
  async getAnimeList(offset, limit) {
    const statement = `
      SELECT a.id id,a.name name,a.year year,a.author author, a.type type,a.place place,a.language language,a.img img,a.index playIndex,pi.link playLink
      FROM anime a
      LEFT JOIN play_index pi ON a.id = pi.id
      LIMIT ?,?;
    `
    const [result] = await connection.execute(statement, [offset, limit])
    for (let item of result) {
      item.playIndex = item.playIndex.split(",")
      item.playLink = item.playLink.split(",")
    }
    return {
      result
    }
  }

  async getSearchList(name,offset,limit){
    const statement = `
      SELECT a.id id,a.name name,a.year year,a.author author, a.type type,a.place place,a.language language,a.img img,a.index playIndex,pi.link playLink
      FROM anime a
      LEFT JOIN play_index pi ON a.id = pi.id
      WHERE a.name LIKE CONCAT("%",?,"%")
      LIMIT ?,?;
    `
    const [result] = await connection.execute(statement, [name,offset, limit])
    console.log(result);
    for (let item of result) {
      item.playIndex = item.playIndex.split(",")
      item.playLink = item.playLink.split(",")
    }
    return {
      result
    }
  }

  async updateAnimeById(id, name, author, type, place, language, year, img) {
    const statement = `
      UPDATE anime SET name=?,author=?,type=?,place=?,language=?,year=?,img=?
      WHERE anime.id = ?;
      `
    const statement1 = `
      UPDATE love_anime SET name=?,author=?,type=?,place=?,language=?,year=?,img=?
      WHERE love_anime.id = ?;
      `
    const [result] = await connection.execute(statement, [name, author, type, place, language, year, img, id])
    const [result1] = await connection.execute(statement1, [name, author, type, place, language, year, img, id])
  }

  async uploadAnime(name,author,type,place,language,year,img,index,link){
    console.log( name,author,type,place,language,year,img,index,link );
    const indexSearch = '`index`'
    const statement = `
      INSERT INTO anime (name,type,place,year,language,author,img,${indexSearch}) 
      VALUES(?,?,?,?,?,?,?,?);
    `
    const statement1 = `
      INSERT INTO love_anime (name,type,place,year,language,author,img,type_all,place_all,year_all,language_all,${indexSearch}) 
      VALUES(?,?,?,?,?,?,?,"全部","全部","全部","全部",?);
    `
    console.log(statement1);
    const statement2 = `
      INSERT INTO play_index (link,${indexSearch}) 
      VALUES(?,?);
    `
    const [result] = await connection.execute(statement, [name,type,place,year,language,author,img,index])
    const [result1] = await connection.execute(statement1, [name,type,place,year,language,author,img,index])
    const [result2] = await connection.execute(statement2, [link,index])
  }

  async deleteAnimeById(id) {
    const statement = `
      DELETE FROM anime WHERE id = ?
    `
    const [result] = await connection.execute(statement, [id])
  }
}

module.exports = new AnimeService()