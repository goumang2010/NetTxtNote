import * as path from 'path';
import {writeFile} from './util/preload/_preload';
import {getDirectories, writeDirRef, getFilterDirs} from './util/preload/_preload_dir';
import {copyTemplate} from './util/preload/_copy';


let folderarr =getFilterDirs(path.join(__dirname, '/modules/db/models/'), ['^[^_]+']);
let sourcarr = [path.join(__dirname, '/util/preload/templates/schema/static.update.ts'),
    path.join(__dirname, '/util/preload/templates/schema/static.count.ts'),
    path.join(__dirname, '/util/preload/templates/schema/static.paginate.ts'),
    path.join(__dirname, '/util/preload/templates/schema/index.ts')];


//复制schema static.update.ts
//User的需要另外修改，以防注入password
copyTemplate(sourcarr, folderarr);
//create文件不包括user
let folderArrForCreate = getFilterDirs(path.join(__dirname, '/modules/db/models/'), ['^(?!User$).+$','^[^_]+']);
copyTemplate([path.join(__dirname, '/util/preload/templates/schema/static.create.ts')], folderArrForCreate);

getDirectories(path.join(__dirname, '/modules/db/models/')).map(p => {
    //console.log(p);
    writeFile('pre_conf.ts', p, ['static', 'validation']);
});

//添加db目录引用
writeDirRef('pre_conf.ts', path.join(__dirname, '/modules/db/models/'),['\\w+'] ,'');

//API公用方法索引
writeFile('pre_conf.ts', path.join(__dirname, '/modules/api/_common'), ['static']);

//部署的API索引
writeFile('_mountAPIConf.ts', path.join(__dirname , '/modules/api/'), ['api'], '');



