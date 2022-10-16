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

var outerVar = 'Outer';
function makeInner(params) {
  var innerVar = 'Inner';

  function inner() {
    console.log(`${outerVar}, ${innerVar}, ${params}가 보입니다!`);
  }
  return inner;
}

var inner = makeInner('Params');
inner();

// // 아래는 함수 스코프이기 때문에 오류 발생
// console.log(innerVar);
