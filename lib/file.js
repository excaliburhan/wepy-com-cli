/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-11-07 07:21:21
 * @modify date 2017-11-07 07:21:21
 * @desc [file操作]
*/

var exists = require('fs').existsSync
var rm = require('rimraf').sync

function rmFile (filename) {
  if (exists(filename)) {
    rm(filename)
  }
}

module.exports = {
  rmFile,
}
