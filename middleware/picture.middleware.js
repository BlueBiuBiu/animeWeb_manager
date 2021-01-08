const path = require("path")
const multer = require("koa-multer")
const jimp = require("jimp")

const upload = multer({
  dest: "uploads/picture/"
})

const handlePicture = upload.array("picture",9)

const handlePictureResize = async (ctx,next) => {
  const files = ctx.req.files
  files.forEach(file => {
    const destPath = path.resolve(file.destination,file.filename)
    jimp.read(destPath).then(res => {
      res.resize(1280,jimp.AUTO).write(`${destPath}-large`)
      res.resize(640,jimp.AUTO).write(`${destPath}-middle`)
      res.resize(320,jimp.AUTO).write(`${destPath}-small`)
    })
  })
  await next()
}

module.exports = {
  handlePicture,
  handlePictureResize
}