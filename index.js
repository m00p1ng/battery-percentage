const execa = require('execa')
const { Observable } = require('rxjs/Observable')
require('rxjs/add/observable/throw')

// Remove %, check if isNaN
const getPercentage = (string) => {
  let s = string.substring(0, string.length - 1)
  if (isNaN(s)) {
    throw new Error('Percentage passed is NaN')
  } else {
    return s
  }
}

const battery = async () => {
  let { stdout } = await execa.shell('pmset -g batt | egrep "([0-9]+%).*" -o')
  stdout = stdout.substring(0, stdout.length - 14).split('; ')

  try {
    return {
      percentage: getPercentage(stdout[0]),
      status: stdout[1],
      estimate: stdout[2],
    }
  } catch (error) {
    throw error
  }
}

module.exports = (intervalCheck = 1000) => {
  // Check if user is using MacOS
  if (process.platform === 'darwin') {
    return new Observable(observer => {
      const timer = setInterval(async () => {
        try {
          observer.next(await battery())
        } catch (error) {
          observer.error(error)
        }
      }, intervalCheck)

      return () => clearInterval(timer)
    })
  } else {
    return Observable.throw(
      new Error('Only MacOS systems are supported, for other platforms check gillstrom/battery-level.')
    )
  }
}
