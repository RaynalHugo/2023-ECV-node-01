import { sayHello } from './sayHello.js';
import { readFileSync} from 'fs';
import {readFile, writeFile } from 'fs/promises';

sayHello('Lolita');

const file = readFileSync('./package.json');

console.log(JSON.parse(file.toString()).version, ' : Sync');

const filepromise = readFile('./package.json')
console.log("_______________");
const data = await filepromise

const version = JSON.parse(data.toString()).version;
console.log(version);
console.log(filepromise);

console.log('Fin du programme');