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

function filter(arr, predicate) {
  let idx = -1,
    len = arr.length,
    result = [];

  while (++idx < len) {
    let value = arr[idx];
    if (predicate(value, idx, this)) {
      result.push(value);
    }
  }
  return result;
}

const bornIn1903 = (person) => person.birthYear === 1903;
const fullname = (person) => person.firstname + ' / ' + person.lastname;

const data1 = _.filter(persons, bornIn1903).map(fullname).join(' and ');

console.log(data1);
