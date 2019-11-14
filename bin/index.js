#!/usr/bin/env node
const Kds = require('../lib/kds')
const { getDB } = require('../lib/utils')
const kds = new Kds()

//  KDS 已配置
if (Object.keys(getDB()).length) {
  const [nodePath, filePath, params] = process.argv
  if (params) {
    kds.handlePath(params)
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
  kds.setConf()
}
