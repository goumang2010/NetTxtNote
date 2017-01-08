import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
import {getFilterDirs} from './_preload_dir';

function copyTemplate(sourcearr, folderarr) {
    for (let target of folderarr) {
        for (let source of sourcearr) {
            shell.cp('-f', source, target);
        }
    }
}


export {copyTemplate}
//getDirectories(path.join(__dirname, '/modules/db/models/'));