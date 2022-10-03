import * as R from 'ramda';
import _ from 'lodash';

const add = function (a, b) {
  return a + b;
};

const c_add = R.curry(add);

const input = _.range(5000);

function addAll(arr, fn) {
  let result = 0;
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      result += fn(arr[i], arr[j]);
    }
  }
  return result;
}

console.log('start');
console.time('Curry 아닌 경우');
let val = addAll(input, add);
console.log(`결과값 : ${val}`);
console.timeEnd(`Curry 아닌 경우`);

console.time('Curry');
val = addAll(input, c_add);
console.log(`결과값 : ${val}`);
console.timeEnd(`Curry`);

// Chart
// visibility => chart / series / point
// Legend => Tree Structure
