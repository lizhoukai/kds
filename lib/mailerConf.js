/*
 * @Author: 余树
 * @Date: 2019-11-14 13:56:27
 * @Last Modified by: 余树
 * @Last Modified time: 2019-11-14 15:07:51
 * @desc: nodemoiler 配置校验信息
 */

const mailerConf = [
  {
    type: 'text',
    name: 'sender',
    message: '输入发件人邮箱地址(QQ、163、Gmail)',
    validate: v =>
      /^[\w._]+@(qq|gmail|163)\.com(\r\n|\r|\n)?$/.test(v) ? true : `请输入正确的发件人邮箱地址`
  },
  {
    type: 'text',
    name: 'password',
    message: '输入发件人邮箱密码(QQ邮箱需要授权码)',
    validate: v => (v ? true : '输入发件人邮箱密码(QQ邮箱需要授权码)')
  },
  {
    type: 'text',
    name: 'addressee',
    message: `输入Kindle电子邮箱`,
    validate: v => (/^\w+@kindle\.cn/.test(v) ? true : `请输入正确的Kindle电子邮箱`)
  }
]

module.exports = mailerConf
