import { range } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const delay = async (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms, ms));

// delay(1000).then((data) => console.log(`실행 ${data}`));

const start = new Date();

const log = (data) => {
  const end = new Date();
  console.log(`실행  ${data}, 시간 : ${end - start}`);
};

[1000, 1000, 3000].map(async (data) => delay(data).then(log));
