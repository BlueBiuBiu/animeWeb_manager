const AnimeService = require("../service/anime.service")

class AnimeController {
  async list(ctx,next){
    const { offset, limit } = ctx.query
    const result = await AnimeService.getAnimeList(offset,limit)
    ctx.body = result
  }

  async searchList(ctx,next){
    const { offset, limit } = ctx.query
    const { animeName } = ctx.params
    const result = await AnimeService.getSearchList(animeName,offset,limit)
    ctx.body = result
  }

  async updateAnime(ctx,next){
    const { animeId } = ctx.params
    const { name,author,type,place,language,year,img } = ctx.request.body
    await AnimeService.updateAnimeById(animeId,name,author,type,place,language,year,img)
    ctx.body = "更新成功~"
  }

  async uploadAnime(ctx,next){
    const { name,author,type,place,language,year,img,index,link } = ctx.request.body
    await AnimeService.uploadAnime(name,author,type,place,language,year,img,index,link)
    ctx.body = "上传成功~"
  }

  async deleteAnime(ctx,next){
    const { animeId } = ctx.params
    await AnimeService.deleteAnimeById(animeId)
    ctx.body = "删除成功~"
  }
}

module.exports = new AnimeController()