import * as R from 'ramda';
import _ from 'lodash';

const square = (x) => Math.pow(x, 2);
const isEven = (x) => x % 2 === 0;
const numbers = _.range(200);

const result = _.chain(numbers).map(square).filter(isEven).take(3).value();

console.log(result.length);
