const router = require("koa-router")

const {
  uploadPicture
} = require("../controller/picture.controller.js")

const {
  verifyToken
} = require("../middleware/auth.middleware")

const {
  handlePicture,
  handlePictureResize
} = require("../middleware/picture.middleware")

const pictureRouter = new router({prefix: "/picture"})

pictureRouter.post("/",verifyToken,handlePicture,handlePictureResize,uploadPicture)

module.exports = pictureRouter