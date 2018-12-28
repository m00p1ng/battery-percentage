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

const getSource = (line) => {
  if (line.includes('AC Power')) {
    return 'Power Adapter'
  } else if (line.includes('Battery')) {
    return 'Battery'
  } else {
    return 'Unknown'
  }
}

const battery = async () => {
  let { stdout } = await execa.shell('pmset -g ps')
  const lines = stdout.split('\n')
  stdout = lines[1].split('\t')[1]
  stdout = stdout.substring(0, stdout.length - 14).split('; ')

  try {
    return {
      source: getSource(lines[0]),
      percentage: getPercentage(stdout[0]),
      status: stdout[1],
      estimate: stdout[2],
    }
  } catch (error) {
    throw error
  }
}

module.exports = (option = { interval: 1000 }) => {
  // Check if user is using MacOS
  if (process.platform === 'darwin') {
    return new Observable(observer => {
      (async () => {
        try {
          observer.next(await battery())
        } catch (error) {
          observer.error(error)
        }
      })()
      const timer = setInterval(async () => {
        try {
          observer.next(await battery())
        } catch (error) {
          observer.error(error)
        }
      }, option.interval)

      return () => clearInterval(timer)
    })
  } else {
    return Observable.throw(new Error('Only MacOS systems are supported.'))
  }
}
