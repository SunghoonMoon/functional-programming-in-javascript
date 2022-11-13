import _ from 'lodash';
import * as R from 'ramda';
import { Person } from './student.js';
import { Address, zipCode } from './address.js';
import { Tree, Node } from './tree.js';

const p1 = new Person('Haskell', 'Curry', '111-11-1111');
p1.address = new Address('US', 'S1', 'C1');
p1.birthYear = 1900;
const curry = new Node(p1);

const p2 = new Person('Barkley', 'Rosser', '222-22-2222');
p2.address = new Address('Greece', 'SG', 'CG1');
p2.birthYear = 1907;
const rosser = new Node(p2);

const p3 = new Person('John', 'von Neumann', '333-33-3333');
p3.address = new Address('Hungary', 'SH', 'CH3');
p3.birthYear = 1903;
const neumann = new Node(p3);

const p4 = new Person('Alonzo', 'Church', '444-44-4444');
p4.address = new Address('US', 'S2', 'C4');
p4.birthYear = 1903;
const church = new Node(p4);

const p5 = new Person('David', 'Hilbert', '555-55-5555');
p5.address = new Address('Germany', 'S3', 'C5');
p5.birthYear = 1903;
const hilbert = new Node(p5);

const p6 = new Person('Alan', 'Turing', '666-66-6666');
p6.address = new Address('England', 'S4', 'C6');
p6.birthYear = 1912;
const turing = new Node(p6);

const p7 = new Person('Stephen', 'Kleene', '777-77-7777');
p7.address = new Address('US', 'S1', 'C1');
const kleene = new Node(p7);

const mendelson = new Node(new Person('Elliot', 'Mendelson', '888-88-8888'));
const sacks = new Node(new Person('Gerald', 'Sacks', '999-99-9999'));
const gandy = new Node(new Person('Robin', 'Gandy', '111-11-1112'));
const nelson = new Node(new Person('Nels', 'Nelson', '111-11-1113'));
const constable = new Node(new Person('Robert', 'Constable', '111-11-1114'));

const persons = [p1, p2, p3, p4, p5, p6, p7];

const isValid = (val) => !_.isUndefined(val) && !_.isNull(val);
const allValid = (args) => _.every(args, isValid);

church.append(rosser).append(turing).append(kleene);
kleene.append(nelson).append(constable);
rosser.append(mendelson).append(sacks);
turing.append(gandy);

Tree.map(church, (p) => console.log(p.fullname));
