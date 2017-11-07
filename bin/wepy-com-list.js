#!/usr/bin/env node

var path = require('path')
var request = require('request')
var chalk = require('chalk')
var exists = require('fs').existsSync
var wepyConfig = require('../appConfig.json') // 配置文件
var configPath = process.cwd() + '/wepy-com-config.json'
if (exists(configPath)) {
  wepyConfig = require(configPath)
}

process.on('exit', function () {
  console.log()
})

console.log()
request({
  url: 'https://api.github.com/users/'+ wepyConfig.user +'/repos',
  headers: {
    'User-Agent': wepyConfig.user
  }
}, function (err, res, body) {
  if (err) console.error(err)
  var requestBody = JSON.parse(body)
  if (Array.isArray(requestBody)) {
    console.log()
    console.log('  现有组件列表:')
    console.log()
    requestBody.forEach(function (repo) {
      console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.cyan(repo.name) +
        ' - ' + repo.description
      )
    })
  } else {
    console.error(requestBody.message)
  }
})
