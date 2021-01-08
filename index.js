require("./app/config")
const Koa = require("koa")
const cors = require("koa-cors")
const bodyParser = require("koa-bodyparser")
const errorHandle = require("./app/errorHandle")

const useRouter = require("./router")

const app = new Koa()

app.use(cors())
app.use(bodyParser())

app.useRouter = useRouter
app.useRouter()

app.on("error",errorHandle)

app.listen(8000,() => {
  console.log("服务器已启动");
})