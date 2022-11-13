import _ from 'lodash';
import * as R from 'ramda';
import { Person } from './student.js';
import { Address, zipCode } from './address.js';

const p1 = new Person('Haskell', 'Curry', '111-11-1111');
p1.address = new Address('US', 'S1', 'C1');
p1.birthYear = 1900;

const p2 = new Person('Barkley', 'Rosser', '222-22-2222');
p2.address = new Address('Greece', 'S1', 'C1');
p2.birthYear = 1907;

const p3 = new Person('John', 'von Neumann', '333-33-3333');
p3.address = new Address('Hungary', 'S1', 'C3');
p3.birthYear = 1903;

const p4 = new Person('Alonzo', 'Church', '444-44-4444');
p4.address = new Address('US', 'S2', 'C4');
p4.birthYear = 1903;

const persons = [p1, p2, p3, p4];

const name = (s) => (s !== null && s !== undefined ? s.toString() : '');

function reduce(arr, fn, accumulator) {
  let idx = -1,
    len = arr.length;

  if (!accumulator && len > 0) {
    accumulator = arr[++idx];
  }

  while (++idx < len) {
    accumulator = fn(accumulator, arr[idx], idx, arr);
  }
  return accumulator;
}

const getCountry = (person) => person.address.country;
const gatherStats = (stat, criteria) => {
  stat[criteria] = _.isUndefined(stat[criteria]) ? 1 : stat[criteria] + 1;
  return stat;
};

const data = _.map(persons, getCountry).reduce(gatherStats, {});

console.log(data);

const cityPath = ['address', 'city'];
const cityLens = R.lens(R.path(cityPath), R.assocPath(cityPath));

const data1 = _.map(persons, R.view(cityLens)).reduce(gatherStats, {});
console.log(data1);

const data2 = _.groupBy(persons, R.view(cityLens));
console.log(data2);

console.log([20, 5, 2].reduce(_.divide)); // 2
console.log([20, 5, 2].reduceRight(_.divide)); // 2 /(100) = 0.02
