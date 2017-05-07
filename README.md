# battery-percentage

> Get current MacOS battery level

Works on macOS only.

## Install
```
$ npm install --global battery-percentage
```

## Usage
```js
const batteryPercentage = require('battery-percentage')

batteryPercentage().then(percentage => {
  console.log(percentage)
})
// 36%

batteryPercentage({ verbose: true }).then(percentage => {
  console.log(percentage)
})
// 36%; charging; 3:36 remaining
```

## Related
- [battery-percentage-cli](https://github.com/dreamorosi/battery-percentage-cli) -  CLI for this module
- [battery-level](https://github.com/gillstrom/battery-level) - Get current battery level

## License
MIT © [Andrea Amorosi](https://dreamorosi.com)
