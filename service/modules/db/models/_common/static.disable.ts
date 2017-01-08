
/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
import * as mongoose from 'mongoose';

import errors   from '../../errors';

let _ObjectId = mongoose.Types.ObjectId;
let deleteRecord = async function(id, context){
    if(!_ObjectId.isValid(id)){
        return errors.error({
            code  : '104',
            path  : 'id',
            value : id
        }, 'lite');
    }

    try{
        let
        obj = await context.findById(id, '_status').where('_status').equals(1);

        if(!obj)
            return errors.error({
                code  : '108',
                path  : 'id',
                value : id
            }, 'lite');

        if(obj['_status'] === 1){
            obj['_status'] = 0;
            obj = await obj.save();
        }

        if(obj['_status'] === 0)
            return {
                code : 200,
                id   : obj._id
            };
        else
            return errors.error({
                code : '1'
            }, 'lite');
    }catch(err){
        return err;
    }
};

let
fn = async function(v){
    let
    errors  = [],
    success = [];

    try{
        for(let i in v){
            let
            res = await deleteRecord(v[i], this);
            if(res.code !== 200)
                errors = errors.concat(res);
            else
                success.push(res);
        }

        return {
            code : 200,
            data : {
                list : errors.concat(success)
            }
        };
    }catch(err){
        return err;
    }
};

export default {
    name : '$disable',
    fn   : fn
};
