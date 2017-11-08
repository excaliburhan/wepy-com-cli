#!/usr/bin/env node

var program = require('commander')
var inquirer = require('inquirer')
var download = require('download-git-repo')
var chalk = require('chalk')
var ora = require('ora')
var path = require('path')
var exists = require('fs').existsSync
var rm = require('rimraf').sync
var rmFile = require('../lib/file').rmFile
var wepyConfig = require('../appConfig') // 配置文件
var configPath = process.cwd() + '/wepy-com-config.json'
if (exists(configPath)) {
  wepyConfig = require(configPath)
  console.log(wepyConfig)
}

// 下载git仓库
function downloadTpl(template) {
  var spinner = ora('下载组件中...')
  spinner.start()
  download(template, dirPath, function (err) {
    spinner.stop()
    console.log()
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    // 移除readme
    rmFile(dirPath + '/README.md')
    rmFile(dirPath + '/readme.md')
    console.log(chalk.green('成功下载：' + dirName))
    process.exit()
  })
}

// 帮助
function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}

// 执行函数
function run () {
  if (!hasSlash) {
    var downloadTemplate = wepyConfig.user + '/' + templateName
    downloadTpl(downloadTemplate)
  } else {
    downloadTpl(templateName)
  }
}

program
.usage('<name> [path-to-dir]')
.on('--help', function () {
  console.log('  示例:')
  console.log()
  console.log(chalk.gray('    # 添加组件，默认地址为当前目录的components文件夹'))
  console.log('    $ wepy-com add name path-to-dir')
  console.log(chalk.green('    Or'))
  console.log('    $ wepy-com add owner/name path-to-dir')
  console.log()
})

help()

// 获取变量
var templateName = program.args[0]
var dirName = program.args[1]
var hasSlash = templateName.indexOf('/') > -1
var dirPath

// 组件相对目录
if (!dirName) {
  dirName = templateName.split('/').pop()
}
dirPath = path.resolve(wepyConfig.dir + '/' + dirName)

console.log()
process.on('exit', function () {
  console.log()
})

// 覆盖文件夹
if (exists(dirPath)) {
  inquirer
  .prompt([
    {
      name: 'ok',
      type: 'confirm',
      message: '目录已存在，是否覆盖？'
    }
  ])
  .then(function (ans) {
    if (ans.ok) {
      rm(dirPath)
      run()
    }
  })
} else {
  run()
}
