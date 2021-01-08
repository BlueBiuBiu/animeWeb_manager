const {
  IS_REGISTERD,
  IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  IS_NOT_ADMINISTRATOR
} = require("../constants/errorHandle")

const errorHandle = (error,ctx) => {
  let message = ""
  let statusCode = 404
  switch(error.message){
    case IS_REGISTERD:
      message = "该用户已经被注册过了"
      statusCode = 409
      break;
    case IS_NOT_EXISTS:
      message = "该用户不存在"
      statusCode = 409
      break;
    case PASSWORD_IS_INCORRENT:
      message = "密码不正确"
      statusCode = 409
      break;
    case IS_NOT_ADMINISTRATOR:
      message = "只有管理员才能进入"
      statusCode = 403
    default: 
      message = "NOT FOUND"
  }
  ctx.status = statusCode
  ctx.body = message
}

module.exports = errorHandle