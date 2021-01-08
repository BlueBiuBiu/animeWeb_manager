const router = require("koa-router")

const {
  list,
  updateAnime,
  deleteAnime,
  searchList,
  uploadAnime
} = require("../controller/anime.controller")

const AnimeRouter = new router({prefix: "/anime"})

AnimeRouter.get("/",list)
AnimeRouter.get("/:animeName",searchList)
AnimeRouter.post("/:animeId",updateAnime)
AnimeRouter.post("/upload/animeInfo",uploadAnime)
AnimeRouter.post("/delete/:animeId",deleteAnime)

module.exports = AnimeRouter