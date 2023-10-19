import { sayHello } from './sayHello.js';
import { readFileSync} from 'fs';
import {readFile, writeFile } from 'fs/promises';

sayHello('Lolita');

const file = readFileSync('./package.json');

console.log(JSON.parse(file.toString()).version, ' : Sync');

const filepromise = readFile('./package.json')

filepromise.then(data => {
    const version = JSON.parse(data.toString()).version;
    console.log(version);
    return version;
}).then(version =>{
   return writeFile('./version', version)
}).then(() => {
    console.log("Version entrée dans le fichier")
})
console.log(filepromise);

console.log('Fin du programme');