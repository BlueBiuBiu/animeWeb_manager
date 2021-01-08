const jwt = require("jsonwebtoken")

const {
  md5Password
} = require("../utils/passwordHandle")

const { publickey } = require("../app/config")

const {
  IS_REGISTERD,
  IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  IS_NOT_ADMINISTRATOR
} = require("../constants/errorHandle")

const userService = require("../service/user.service")

const passwordHandle = async (ctx,next) => {
  const { name, password } = ctx.request.body
  const md5Result = md5Password(password)
  ctx.request.body.password = md5Result
  await next()
}

const verifyRegister = async (ctx,next) => {
  const { name } = ctx.request.body
  const result = await userService.getUser(name)
  if(result){
    const error = new Error(IS_REGISTERD)
    return ctx.app.emit("error",error,ctx)
  }
  await next()
}

const verifyLogin = async (ctx,next) => {
  const { name, password } = ctx.request.body
  if(name !== "admin"){
    const error = new Error(IS_NOT_ADMINISTRATOR)
    return ctx.app.emit("error",error,ctx)
  } else {
    const result = await userService.getUser(name)
    if(!result.length){
      const error = new Error(IS_NOT_EXISTS)
      return ctx.app.emit("error",error,ctx)
    }
    console.log(ctx.user);
    const mdResult = md5Password(password)
    const dbResult = await userService.getPassword(name)
    if(mdResult !== dbResult){
      const error = new Error(PASSWORD_IS_INCORRENT)
      return ctx.app.emit("error",error,ctx)
    }
    await next()
  }
}

const verifyToken = async (ctx,next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace("Bearer ","")
  const result = jwt.verify(token,publickey,{
    algorithms: ["RS256"]
  })
  ctx.user = result
  if(result){
    await next()
  } else {
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit("error",error,ctx)
  }
}



module.exports = {
  passwordHandle,
  verifyRegister,
  verifyLogin,
  verifyToken
}