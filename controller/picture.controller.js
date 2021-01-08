const pictureService = require("../service/picture.service.js")

class PictureController {
  async uploadPicture(ctx,next){
    const { id } = ctx.user
    const files = ctx.req.files
    for(let file of files){
      const { filename, mimetype, size } = file
      await pictureService.uploadPicture(filename,mimetype,size,id)
    }
    ctx.body = "上传图片成功"
  }
}

module.exports = new PictureController()