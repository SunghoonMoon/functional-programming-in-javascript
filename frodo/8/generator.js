import _ from 'lodash';
import * as R from 'ramda';
import log4js from 'log4js';
import { persons } from './personData.js';

const isEmpty = (s) => !s || !s.trim();

// \s 는 공백 의미
// 마지막 g는 global 의미. 전체 문자열
const trim = (str) => str.replace(/^\s*|\s*$/g, '');
const normalize = (str) => str.replace(/\-/g, '');

// const first = async () =>
//   await setTimeout(() => {
//     console.log('first : 1초');
//     return [1, 2, 3];
//   }, 1000);

const delay = async (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms, new Date().getMilliseconds());
  });

function range(start, end) {
  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (start < end) {
        return { value: start++, done: false };
      }
      return { done: true, value: end };
    },
  };
}

const test = range(1, Number.POSITIVE_INFINITY);

console.log(test.next().value); // 1
console.log(test.next().value); // 2
console.log(test.next().value); // 3
