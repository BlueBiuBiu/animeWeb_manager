const fs = require("fs")
const path = require("path")
require("dotenv").config()

const privateKeyPath = path.resolve(__dirname,"keys/private.key")
const publicKeyPath = path.resolve(__dirname,"keys/public.key")

const privateKey = fs.readFileSync(privateKeyPath,{encoding: "utf-8"})
const publickey = fs.readFileSync(publicKeyPath,{encoding:"utf-8"})

module.exports = {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  APP_HOST,
  APP_PORT
} = process.env

module.exports.privateKey = privateKey
module.exports.publickey = publickey 

