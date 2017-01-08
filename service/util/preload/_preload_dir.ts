
//生成目录下静态及验证方法的Typescript引用
import * as fs from 'fs';
import * as path from 'path';

function getDirectories(srcpath,absolute=true) {
    let temppaths = fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
    if (absolute) {
        return temppaths.map(x => path.join(srcpath, x));
    }
    else {
        return temppaths;
    }
    
}

function validatePath(path: string, regarr: Array<string>) {
    for (let r of regarr) {
        if (!(path.match(r))) {
            return false;
        }
    }
    return true;
}

function* getFilterDirs( fatherDir: string, regarr: Array<string>) {
    let dirarrs = getDirectories(fatherDir, false);
    for (let x of dirarrs) {
        if (validatePath(x, regarr)) {
            yield path.join(fatherDir, x);
        }
    }
}

let refDirs = function (dir, matstr: string[], prefix) {
    let outputstr: string="//Generate by preload script using node fs;\n";
    let res = getDirectories(dir,false);
    matstr.forEach((str) => {
        let regstr = new RegExp(str);
        //console.log(regstr);
        let matched = res.map(x => x.match(regstr));
        let output = [],
            valarr = [],
            exportarr = [];
        matched.forEach(function (val: string[]) {
            if (val) {
                let modulename = `${val}`;
                let varname = `${val}_mod`;
                output.push(`import * as ${varname} from './${modulename}';`);
                valarr.push(`${val}`);
                exportarr.push(`${varname}`);
            }
        });
        let finalarr = [];
        finalarr.push(`${output.join('\n')}`);
        finalarr.push(`let s_arr= [\n${exportarr.join(',\n')}\n];`);
        let valstr = valarr.map(x => prefix + x).join(',');
        finalarr.push(`let [${valstr}]=s_arr;`);
        finalarr.push(`let s={${valstr}};`);
        finalarr.push(`export { s_arr,s}`);
        outputstr += finalarr.join('\n')+'\n\n';

    });
    return outputstr;
};
//生成的引用文件会和方法文件在同一个目录下
let writeDirRef = function (filename,dir, match,prefix='$') {
    fs.writeFileSync(path.join(dir , filename), refDirs(dir, match, prefix));
}
export {refDirs, writeDirRef, getDirectories, getFilterDirs}


