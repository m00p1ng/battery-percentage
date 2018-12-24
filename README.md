# MacOS Battery Level

> Get current MacOS battery level

Works on macOS only.

## Install
```
$ npm install macos-battery-level --save

or

$ yarn add macos-battery-level
```

## Usage
```js
const batteryLevel = require('macos-battery-level')

// fetch interval = 1s (1000ms)
batteryLevel({ interval: 1000 }).subscribe(percentage => {
  console.log(percentage)
})
// { 
//   percentage: '82',
//   status: 'charging',
//   estimate: '1:13 remaining' 
// }
```

## License
MIT © Mongkonchai Priyachiwa
