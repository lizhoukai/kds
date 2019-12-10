#!/usr/bin/env node
const { getDB, delDB } = require('../lib/utils')
const DB_LEN = Object.keys(getDB()).length
const Kds = require('../lib/kds')
const KDS = new Kds()

if (DB_LEN) {
  const [nodePath, filePath, params] = process.argv
  if (params) {
    switch (params) {
      case 'init':
        delDB()
        KDS.setConf()
        break
      // future
      default:
        KDS.handlePath(params)
        break
    }
  } else {
    require('commander')
      .version(require('../package').version)
      .usage('<command> [options]')
      .option('./dir', '指定目录下的文本打包并发送kidle邮箱')
      .option('/kds.mobi', '指定单个格式文本打包并发送kidle邮箱')
      .option('https://baidu.com', '爬虫并打包发送kidle邮箱')
      .command('', '🤩')
      .parse(process.argv)
  }
} else {
  KDS.setConf()
}
