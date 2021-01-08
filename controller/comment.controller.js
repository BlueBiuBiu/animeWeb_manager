const commentService = require("../service/comment.service")

class CommentController {
  async create(ctx,next){
    const { userId } = ctx.params
    const { content, animeId, commentId } = ctx.request.body
    await commentService.create(userId,content,animeId,commentId)
    ctx.body = "评论成功"
  }

  async list(ctx,next){
    const { animeId } = ctx.query
    const result = await commentService.getCommentListByAnimeId(animeId)
    ctx.body = result
  }

  async thumbUpAdd(ctx,next){
    const { commentId } = ctx.params
    const { userId } = ctx.query
    const result = await commentService.thumbUpAdd(commentId,userId)
    ctx.body = "点赞成功"
  }

  async thumbDownAdd(ctx,next){
    const { commentId } = ctx.params
    const { userId } = ctx.query
    const result = await commentService.thumbDownAdd(commentId,userId)
    ctx.body = "点踩成功"
  }
}

module.exports = new CommentController()