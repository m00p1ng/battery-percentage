var assert = require('assert')
const { first } = require('rxjs/operators')
const BatteryLevel = require('./index')

BatteryLevel().pipe(first()).subscribe((battery) => {
  console.log(battery)
  assert(typeof battery.source === 'string')
  assert(typeof battery.percentage === 'string')
  assert(typeof battery.status === 'string')
  assert(typeof battery.estimate === 'string')
})