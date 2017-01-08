require('../../index.js');
import test from 'ava';
import { models } from '../../modules/db/models';
//random string
var randomstring = require("randomstring");




test('usergroup', async (x) => {
    let s_model: any = models.UserGroup;
    //record the count
    let countdata = (await s_model.model.$count({ filter: { _status: 1 } }));
    let oldcount = countdata.data.count;
    let newrecords = [];
    
    // create 10 records
    for (let i = 0; i < 10; i++) {
        newrecords.push(await s_model.model.$create({
            name: randomstring.generate(7),
            code: randomstring.generate({
                length: 6,
                charset: 'numeric'
            })
        }));
    }
    let curcountres = (await s_model.model.$count({ filter: { _status: 1 } }));
  //  console.log(JSON.stringify(newrecords,null,4));
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
        let uptresult = await s_model.model.$update(uptbody);
        //console.log(uptresult);
       x.is(uptresult.data.name, tt.data.name + 'changed');
    }
    console.log('update finished');
    //pagination
    let pageres = await s_model.model.$paginate({ limit:10});
    //console.log(pageres);
    //delete them
    let dellist = newrecords.map(x => x.data._id);
    let delresult = await s_model.model.$delete(dellist);
    curcount = (await s_model.model.$count({ filter: { _status: 1 } })).data.count;
    x.is(curcount, oldcount);
    console.log('10 records have been deleted');
});