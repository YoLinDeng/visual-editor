/* eslint-disable */
const exec = require('child_process').exec
const inquirer = require('inquirer')

const states = {
  major: '版本升级（新功能不兼容旧版本时）',
  minor: '特性更新（添加新功能或功能增强时）',
  patch: '修复补丁（修复常规错误时）',
  skip: '跳过（谨慎！请仅在未完成时选择此项）'
}

inquirer.prompt([
  {
    type: 'list',
    name: 'version',
    message: '请选择您要升级的版本号类型:',
    choices: Object.keys(states).map(k => `${k}: ${states[k]}`)
  }
]).then(({ version }) => {
  const type = version.split(':')[0]
  if (type !== 'skip') {
    exec(`npm run standard -- --release-as ${type}`)
    console.log('正在更新版本号.....')
  }
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
