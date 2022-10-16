import * as R from 'ramda';
import { Student } from './student.js';
import { Address, zipCode } from './address.js';

const curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State');
curry.address = new Address('US');

const turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton');
turing.address = new Address('England');

const church = new Student('Alonzo', 'Church', '333-33-3333', 'Princeton');
church.address = new Address('US');

const kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton');
kleene.address = new Address('US');

const people = [curry, turing, church, kleene];

var arr = [1, 2, 3, 4];

function processArr() {
  function multipleBy10(val) {
    console.log(val);
    i = 10;
    return val * i;
  }

  for (var i = 0; i < arr.length; i++) {
    arr[i] = multipleBy10(arr[i]);
  }
  return arr;
}
processArr();
console.log(arr);
