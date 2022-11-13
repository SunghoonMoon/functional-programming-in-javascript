import { Person } from './student.js';
import { Address, zipCode } from './address.js';

const p1 = new Person('Haskell', 'Curry', '111-11-1111');
p1.address = new Address('US', 'S1', 'C1');
p1.birthYear = 1900;

const p2 = new Person('Barkley', 'Rosser', '222-22-2222');
p2.address = new Address('Greece', 'SG', 'CG1');
p2.birthYear = 1907;

const p3 = new Person('John', 'von Neumann', '333-33-3333');
p3.address = new Address('Hungary', 'SH', 'CH3');
p3.birthYear = 1903;

const p4 = new Person('Alonzo', 'Church', '444-44-4444');
p4.address = new Address('US', 'S2', 'C4');
p4.birthYear = 1903;

const p5 = new Person('David', 'Hilbert', '555-55-5555');
p5.address = new Address('Germany', 'S3', 'C5');
p5.birthYear = 1903;

const p6 = new Person('Alan', 'Turing', '666-66-6666');
p6.address = new Address('England', 'S4', 'C6');
p6.birthYear = 1912;

const p7 = new Person('Stephen', 'Kleene', '777-77-7777');
p7.address = new Address('US', 'S1', 'C1');

export const persons = [p1, p2, p3, p4, p5, p6, p7];
