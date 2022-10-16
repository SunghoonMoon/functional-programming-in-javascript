import _ from 'lodash';

const enrollment = [
  { enrolled: 2, grade: 100 },
  { enrolled: 2, grade: 80 },
  { enrolled: 1, grade: 89 },
];

const avg = _.chain(enrollment)
  .filter((student) => student.enrolled > 1)
  .map((student) => student.grade) // pluck 없어짐
  .mean() // average 없어짐
  .value();

console.log(avg);
