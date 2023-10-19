import { sayHello } from './sayHello.js';
import { readFileSync, readFile, writeFile } from 'fs';

sayHello('Lolita');

const file = readFileSync('./package.json');

console.log(JSON.parse(file.toString()).version, ' : Sync');

readFile('./package.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const version = JSON.parse(data.toString()).version;
        console.log(version, ' : Async');

        writeFile('./version', version, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log('File written');
            }
        });
    }
});

console.log('Fin du programme');