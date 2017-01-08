
//生成目录下静态及验证方法的Typescript引用
import * as shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';

let refFiles = function (res:string[], str: string, prefix) {
        let outputstr: string = "//Generate by preload script using shelljs;\n";
        let regstr = new RegExp(`${str}\\.\\w+\\.js$`);
        //console.log(regstr);
        let matched = res.map(x => x.match(regstr));
        let output = [],
            valarr = [],
            exportarr = [];
        matched.forEach(function (val: string[]) {
            if (val) {
                let namearr = val[0].split('.');
                let trimval = namearr[1];
                let modulename = `${str}.${trimval}`;
                let varname = `${str}_${trimval}`;
                output.push(`import * as ${varname} from './${modulename}';`);
                valarr.push(`${trimval}`);
                exportarr.push(`${varname}.default`);
            }
        });
        let finalarr = [];
        finalarr.push(`${output.join('\n')}`);
        finalarr.push(`let ${str}s_arr= [\n${exportarr.join(',\n')}\n];`);
        let valstr = valarr.map(x => prefix + x).join(',');
        finalarr.push(`let [${valstr}]=${str}s_arr;`);
        finalarr.push(`let ${str}s={${valstr}};`);
        finalarr.push(`export { ${str}s_arr,${str}s}`);
        outputstr += finalarr.join('\n')+'\n\n';
    return outputstr;
};
//生成的引用文件会和方法文件在同一个目录下
let writeFile = function (filename, dir, match: string[], prefix = '$') {
    let res = shell.ls(dir);
    for (let str of match) {
        fs.writeFileSync(path.join(dir, `${str}_${filename}`), refFiles(res, str, prefix));
    }
    
}
export {refFiles, writeFile}


