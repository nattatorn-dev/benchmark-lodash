var Benchmark = require('benchmark')
var lodashfp = require('lodash/fp')

var suite = new Benchmark.Suite;

// add tests
testFn = function(v) {
  return v != null ? v : ''
}

suite
  .add('fn', function () {
  let v = Math.random();
  if (v > 0.5)
    v = null
  testFn(v)
  })
  .add('defaultTo', function () {
    let v = Math.random();
    if (v > 0.5)
      v = null
    lodashfp.defaultTo('', v)
  })
  .add('defaultTo curried', function () {
    let v = Math.random();
    if (v > 0.5)
      v = null
    lodashfp.defaultTo('')(v)
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
