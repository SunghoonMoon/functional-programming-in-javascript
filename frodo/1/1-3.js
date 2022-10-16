const db = {
  find: () => ({
    ssn: 1,
    firstname: 'Jo',
    lastname: 'Yunhyeok',
  }),
};

function showStudent(ssn) {
  let student = db.find(ssn);
  if (student != null) {
    document.getElementById(
      'root'
    ).innerHTML = `${student.ssn}, ${student.firstname}, ${student.lastname}`;
  } else {
    throw new Error('학생을 찾을 수 없습니다~~');
  }
}

showStudent('444-44-4444');
