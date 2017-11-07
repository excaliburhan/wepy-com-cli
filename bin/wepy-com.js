#!/usr/bin/env node

var program = require('commander')
var pkgJSON = require('../package.json')

program
  .version(pkgJSON.version)
  .usage('<command> [options]')
  .command('add', '添加wepy组件')
  .command('ls', '查看支持的wepy组件列表')
  .parse(process.argv)
