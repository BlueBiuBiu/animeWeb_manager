const router = require("koa-router")

const {
  handleAvatar
} = require("../middleware/avatar.middleware")

const {
  uploadAvatar
} = require("../controller/avatar.controller")

const avatarRouter = new router({prefix: "/avatar"})

avatarRouter.post("/upload/:userId",handleAvatar ,uploadAvatar)

module.exports = avatarRouter