/*
 * @Author: 余树
 * @Date: 2019-11-14 13:56:27
 * @Last Modified by: 余树
 * @Last Modified time: 2019-12-10 20:45:55
 * @desc: 存储本地配置信息方法集合
 */

const path = require('path')
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const cliPath = path.join(__dirname)
const filePath = `${cliPath}/userConf`
const DB = new JsonDB(new Config(filePath, true, false, '/'))

const setDB = obj => DB.push('/', obj)
const getDB = () => DB.getData('/')
const delDB = () => DB.delete('/')
const checkUrl = url => {
  return /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(url)
}

module.exports = {
  getDB,
  setDB,
  delDB,
  checkUrl
}
