const router = require("koa-router")

const {
  success,
  list,
  updateUser,
  deleteUser,
  searchList,
  deleteUserCollect,
  avatar,
  avatarUrl,
  allAvatarUrl
} = require("../controller/user.controller.js")

const {
  verifyLogin
} = require("../middleware/auth.middleware")

const userRouter = new router({prefix: "/user"})

userRouter.get("/",list)
userRouter.get("/:username",searchList)
userRouter.get("/:userId/avatar",avatar)
userRouter.get("/:userId/avatarUrl",avatarUrl)
userRouter.get("/avatar/Url",allAvatarUrl)
userRouter.post("/login",verifyLogin,success)
userRouter.post("/update/:userId",updateUser)
userRouter.post("/delete/:userId",deleteUser)
userRouter.post("/delete/collect/:userId",deleteUserCollect)

module.exports = userRouter