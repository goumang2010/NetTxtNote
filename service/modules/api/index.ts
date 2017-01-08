
import * as express from 'express';

// Import mount api conf
import * as mountAPIConf from './api__mountAPIConf';

let router = express.Router();
//对路由进行集合
//eg: 127.0.0.1/note/count
for(let rouname in mountAPIConf.apis){
    router.use('/'+rouname, mountAPIConf.apis[rouname]);
}

export default router;
