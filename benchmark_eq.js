var Benchmark = require('benchmark')
var lodashfp = require('lodash/fp')

var suite = new Benchmark.Suite;

testFn = function(v) {
  return v === 0.5
}

function generateValue() {
  let r = Math.random();
  return r
}
// add tests
suite.add('fn', function () {
  let v = generateValue()
  testFn(v)
})
  .add('lodash', function () {
    let v = generateValue()
    lodashfp.eq(v, 0.5)
  })
  .add('lodash curried', function () {
    let v = generateValue()
    lodashfp.eq(v)(0.5)
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
