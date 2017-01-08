require('../../index.js');
import test from 'ava';
import { models } from '../../modules/db/models';
//random string
var randomstring = require("randomstring");




test('user', async (x) => {
    //get usergroup
    let usergroupmodel: any = models.UserGroup;
    let usergroupdef = (await usergroupmodel.model.$paginate({ filter: { name: 'test' } })).data;
    usergroupdef = usergroupdef ? usergroupdef.list[0] : {};
    console.log('test usergroup');
    console.log(JSON.stringify(usergroupdef, null, 4));
    let usermodel: any = models.User;
    //record the count
    let countdata = (await usermodel.model.$count({ filter: { _status: 1 } }));
    let oldcount = countdata.data.count;
    let newrecords = [];
    // create 10 records
    for (let i = 0; i < 10; i++) {
        newrecords.push(await usermodel.model.$create({
            name: randomstring.generate(5),
            password: randomstring.generate(9),
            email_value: randomstring.generate(6) + '@qq.com',
            phone_value: randomstring.generate({
                length: 11,
                charset: 'numeric'
            }),
            role: usergroupdef._id
        }));
    }
    let curcountres = (await usermodel.model.$count({ filter: { _status: 1 } }));
    console.log(curcountres);
    let curcount = curcountres.data.count;
    //if 10 records have been created
    x.is(curcount, oldcount + 10);
    console.log('10 records have been created');
    //update 
    for (let i = 0; i < newrecords.length; i++) {
        let tt = newrecords[i];
        let uptbody = {
            id: tt.data._id,
            data: {
                name: tt.data.name + 'changed'
            }
        };
        //console.log(tt);
        //console.log(uptbody);
        let uptresult = await usermodel.model.$update(uptbody);
        //console.log(uptresult);
       x.is(uptresult.data.name, tt.data.name + 'changed');
    }
    console.log('update finished');
    //pagination
    let pageres = await usermodel.model.$paginate({ limit:10});
    console.log(pageres);
    //delete them
    let dellist = newrecords.map(x => x.data._id);
    let delresult = await usermodel.model.$delete(dellist);
    curcount = (await usermodel.model.$count({ filter: { _status: 1 } })).data.count;
    x.is(curcount, oldcount);
    console.log('10 records have been deleted');
});