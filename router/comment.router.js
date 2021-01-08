const router = require("koa-router")
const commentRouter = new router({prefix: "/comment"})

const {
  list,
  create,
  thumbUpAdd,
  thumbDownAdd
} = require("../controller/comment.controller")

commentRouter.get("/",list)
commentRouter.post("/:userId",create)
commentRouter.post("/thumb/up/:commentId",thumbUpAdd)
commentRouter.post("/thumb/down/:commentId",thumbDownAdd)

module.exports = commentRouter