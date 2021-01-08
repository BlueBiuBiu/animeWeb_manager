const fs = require("fs")
const jwt = require("jsonwebtoken")
const userService = require("../service/user.service")
const avatarService = require("../service/avatar.service")
const { privateKey } = require("../app/config")
const { AVATAR_URL } = require("../constants/filePath")

class userController {
  async success(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, privateKey, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    })
    ctx.body = {
      request: "ok",
      id,
      name,
      token
    }
  }

  async list(ctx,next){
    const { offset, limit } = ctx.query
    const result = await userService.getUserList(offset,limit)
    ctx.body = result
  }

  async searchList(ctx,next){
    const { username } = ctx.params
    const { offset, limit } = ctx.query
    const result = await userService.getSearchList(username,offset,limit)
    ctx.body = result
  }


  async updateUser(ctx,next){
    const { userId } = ctx.params
    const { password } = ctx.request.body
    await userService.updateUserById(userId,password)
    ctx.body = "更新成功"
  }
 
  async deleteUser(ctx,next){
    const { userId } = ctx.params
    await userService.deleteUserById(userId)
    ctx.body = "删除成功"
  }

  async deleteUserCollect(ctx,next){
    const { userId } = ctx.params
    const { collect } = ctx.request.body
    await userService.deleteUserCollectById(userId,collect)
    ctx.body = "删除追番成功"
  }

  async avatar(ctx,next){
    const { userId } = ctx.params
    const result = await avatarService.getAvatarById(userId)
    ctx.response.set("content-type",result.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_URL}/${result.filename}`)
  }

  async avatarUrl(ctx,next){
    const { userId } = ctx.params
    const result = await avatarService.getAvatarUrlById(userId)
    ctx.body = result
  }
  
  async allAvatarUrl(ctx,next){
    const result = await avatarService.getAvatarUrl()
    ctx.body = result
  }
}

module.exports = new userController()