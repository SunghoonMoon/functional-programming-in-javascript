import * as R from 'ramda';

const fork = (join, func1, func2) => (val) => {
  return join(func1(val), func2(val)); // 책 오타..
};

const toLetterGrade = (grade) => {
  if (grade >= 90) return 'A';
  if (grade >= 80) return 'B';
  if (grade >= 70) return 'C';
  if (grade >= 60) return 'D';
  return 'F';
};

export const computeAverageGrade = R.compose(
  toLetterGrade,
  fork(R.divide, R.sum, R.length)
);

export const timesTwo = fork((x) => x + x, R.identity, R.identity);
