import {sayHello} from './sayHello.js';
import {readFileSync} from 'fs';

sayHello('Lolita');

const file = readFileSync('./package.json');

console.log(JSON.parse(file.toString()).version);