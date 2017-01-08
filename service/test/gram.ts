require('babel-register');
require('babel-polyfill');
import * as mongoose from 'mongoose';
import test from 'ava';
//test('iftest', async (x) => {
//    let cc = {
//        x_str: '0',
//        x_int: 0,
//        x_nul: null
//    }
//    if (cc.x_str) {
//        console.log('str ok'); 
//    }  
//    if (cc.x_int || cc.x_int===0) {
//        console.log('int ok');
//    }  
//    if (cc.und ===undefined) {
//        console.log('und ok');
//    }  
//    if (cc.x_nul === null) {
//        console.log('nul ok');
//    }  
//    if (cc.x_nul === null) {
//        console.log('nul ok');
//    }  



//    x.is(true, true)
//});
test('iftest', async (x) => {
    let dd = {
        type: mongoose.Schema.Types.ObjectId
    }
    console.log(dd.type.schemaName);
    x.is(dd.type, mongoose.Schema.Types.ObjectId)
});
