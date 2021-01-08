const avatarService = require("../service/avatar.service")
const userService = require("../service/user.service")
const {
  APP_HOST,
  APP_PORT
} = require("../app/config")

class AvatarController {
  async uploadAvatar(ctx,next){
    const { filename, mimetype, size } = ctx.req.file
    const { userId } = ctx.params
    await avatarService.uploadAvatar(filename,mimetype,size,userId)
    const avatar_url = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`
    await userService.updateAvatar(userId,avatar_url)
    ctx.body = "头像上传成功"
  }
}

module.exports = new AvatarController()