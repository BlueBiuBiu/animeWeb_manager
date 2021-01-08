const fs = require("fs")
const path = require("path")

function useRouter() {
  fs.readdir(__dirname, (err,files) => { 
    if(err) return
    files.forEach(file => {
      if(file === "index.js") return
      const filePath = path.resolve(__dirname,file)
      const router = require(filePath)
      this.use(router.routes())
      this.use(router.allowedMethods())
    })
  })
}

module.exports = useRouter