require('../../index.js');
import test from 'ava';
import * as axios from 'axios';
import * as request from '../../util/request';
import { models } from '../../modules/db/models';
//random string
let _srv = global.$g.config.server;
var randomstring = require("randomstring");
//console.log(JSON.stringify(global.$g, null, 4));



test('note', async (x) => {
    //取得默认Media
    let mediares = await request.default({
        url: `http://localhost:${_srv.port}/api/media/pagination`,
        params: { filter: { name: 'test' } }
    });
   //console.log(JSON.stringify(mediares,null,4))
    let media = mediares['data'].list[0];
    x.is(media['name'], 'test');

    //取得默认目录
    let cateres = await request.default({
        url: `http://localhost:${_srv.port}/api/category/pagination`,
        params: { filter: { name: 'test' } }
    });
    let cate = cateres['data'].list[0];
    x.is(cate['name'], 'test');

    let res = await request.default({
        url: `http://localhost:${_srv.port}/api/note/pagination`,
        params: {
            filter: {
                name: 'test',
                category: cate._id,
                media: [media._id],
                txt: 'test'
            }
        }
    });
    //应该能够查询到一条记录
    //console.log(JSON.stringify(res, null, 4))
    x.is(res['data'].list.length, 1);
    //get one record
    let preone = res['data'].list[0]
    // Single get
    res = await request.default({
        url: `http://localhost:${_srv.port}/api/note/${preone._id}`,
        params: { }
    });
   // console.log(res);
    x.is(res['data'].txt, preone.txt);
    let newrecords = [];
    //create 10 records
    for (let i = 0; i < 10; i++) {
        let para = {
            name: randomstring.generate(7),
            category: cate._id,
            media: [media._id],
            txt: randomstring.generate(40)
        };
        //console.log(para);
        newrecords.push(await request.default({
            method: 'post',
            url: `http://localhost:${_srv.port}/api/note/`,
            data: para
        }));
    }
    newrecords.forEach(p => {
        x.is(p.code, 200);
    });
});