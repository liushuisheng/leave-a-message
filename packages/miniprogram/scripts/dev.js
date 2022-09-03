const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const cliPath = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'
const rootPath = path.resolve(__dirname, '../')
shell.exec(`${cliPath} open --project ${rootPath}`)


fs.watch(rootPath + '/src', { recursive: true }, (eventType, filename) => {
  if(eventType === 'change') {
    shell.exec(`${cliPath} reset-fileutils --project ${rootPath}`)
    console.log(chalk.bold.green(filename + ' update...'))
  }
})