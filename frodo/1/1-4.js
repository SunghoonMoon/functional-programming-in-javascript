const db = {
  find: (ssn) => ({
    ssn,
    firstname: 'Jo',
    lastname: 'Yunhyeok',
  }),
};

const find = (db) => (id) => {
  let obj = db.find(id);
  if (obj === null) {
    throw new Error('객체를 찾을 수 없습니다~~');
  }
  return obj;
};

const csv = (student) =>
  `${student.ssn}, ${student.firstname}, ${student.lastname}`;

const append = (selector) => (info) => {
  document.querySelector(selector).innerHTML = info;
};

function showStudent(ssn) {
  let student = find(db)(ssn);
  append('#root')(csv(student));
}

showStudent('444-44-4444');
