/*
 * @Author: 余树
 * @Date: 2019-11-14 13:56:27
 * @Last Modified by: 余树
 * @Last Modified time: 2019-11-14 17:19:35
 * @desc: KDS CLASS 主入口
 */

const prompts = require('prompts')
const nodemailer = require('nodemailer')
const compressing = require('compressing')
const fs = require('fs')
const mailerConf = require('./mailerConf')
const { setDB, getDB, checkUrl } = require('./utils')
let interval
const cleanup = () => {
  clearInterval(interval)
}

class Kds {
  constructor() {}

  // 设置用户信息
  async setConf() {
    const fillConf = await prompts(mailerConf, {
      onCancel: cleanup,
      onSubmit: cleanup
    })

    if (Object.keys(fillConf).length) {
      setDB(fillConf)
      console.log('KDS设置成功 ✅')
    }
  }

  // 处理邮箱
  handlePath(path) {
    // URL链接爬虫生成文本【feature】
    if (checkUrl(path)) {
      console.log('feature: URL爬虫转格式转换 👻')
    } else {
      try {
        const stat = fs.statSync(path)
        if (stat.isDirectory() || stat.isFile()) {
          const fnField = stat.isDirectory() ? 'compressDir' : 'compressFile'
          compressing.zip[fnField](path, 'kds.zip')
            .then(res => {
              this.handleEmail()
            })
            .catch(err => {
              console.log('压缩失败 ❎ : \n', err)
            })
        } else {
          console.log('无效的格式文件 ❎')
        }
      } catch (err) {
        console.log('路径错误，请填写有效的路径 🐛 : \n', err)
      }
    }
  }

  // 发送邮箱
  handleEmail() {
    const { sender, password, addressee } = getDB()
    const zipSize = this.getFilesize(`./kds.zip`)
    console.log(`KDS正在推送共${zipSize}kb: 🚀🚀🚀🚀\n` + `由${sender}发送至${addressee}\n` + '请耐心等待...')

    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        service: `${sender.split('@')[1].split('.')[0]}`,
        port: 465,
        secureConnection: true,
        secure: true,
        auth: {
          user: sender,
          pass: password
        }
      })
      const mailOptions = {
        from: sender,
        to: addressee,
        subject: 'KDS 转发',
        html: `<b>kindle send by KDS</b>`,
        attachments: [
          {
            filename: 'kds.zip',
            path: `${process.cwd()}/kds.zip`
          }
        ]
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log('压缩失败 ❎ : \n', err)
        }
        console.log('邮件发送成功~ 🎉')
      })
    })
  }

  getFilesize(path) {
    let stat = fs.statSync(path)
    return stat ? stat.size : 'error'
  }
}

module.exports = Kds
