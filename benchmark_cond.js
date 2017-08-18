var Benchmark = require('benchmark')
var lodashfp = require('lodash/fp')

var suite = new Benchmark.Suite;

const directionIsUpFn = direction => direction === 'up'
const directionIsUpLodash = lodashfp.matches({direction: 'up'})

testFn = function(v) {
  if (directionIsUpFn(v.direction))
    return 'direction up'
  else
    return 'direction down'
}

function generateValue() {
  let r = Math.random();
  let rval = { direction: 'up' }
  if (r > 0.5) {
    rval = { direction: 'down' }
  }
  return rval
}
// add tests
suite.add('fn', function () {
  let v = generateValue()
  testFn(v)
})
  .add('lodash', function () {
    let v = generateValue()
    lodashfp.cond([
      [directionIsUpLodash, lodashfp.constant('direction up')],
      [lodashfp.stubTrue, lodashfp.constant('direction down')]
    ])
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
