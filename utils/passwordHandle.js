const crypto = require('crypto')

const md5Password = (password) => {
  const md5Handle = crypto.createHash("md5")
  return md5Handle.update(password).digest("hex")
}

module.exports = {
  md5Password
}