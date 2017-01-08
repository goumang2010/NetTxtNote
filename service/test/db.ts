require('../index.js');
import  test from 'ava';
import { models } from '../modules/db/models';
//random string
var randomstring = require("randomstring");




test('user', async (x) => {
    let usermodel: any = models.User;
    //record the count
    let oldcount = (await usermodel.model.$count({ filter: { _status: 1 } })).data.count;
    let newrecords = [];
   // create 10 records
    for (let i = 0; i < 10; i++) {
        newrecords.push(await usermodel.model.$create({
            name: randomstring.generate(5),
            password: randomstring.generate(9),
            email: randomstring.generate(6) + '@qq.com',
            phone: randomstring.generate({
                length: 11,
                charset: 'numeric'
            })
        }));
    }
    let curcount = (await usermodel.model.$count({ filter: { _status: 1 } })).data.count;
    //if 10 records have been created
    x.is(curcount, oldcount + 10);
    console.log('10 records have been created');
    //delete them
    let dellist = newrecords.map(x => x.data._id);
    let delresult = await usermodel.model.$delete(dellist);
    curcount = (await usermodel.model.$count({ filter: { _status: 1 } })).data.count;
    x.is(curcount, oldcount);
    console.log('10 records have been deleted');
});