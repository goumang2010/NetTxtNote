
import * as mongoose from 'mongoose';

import errors   from '../../errors';

let
fn = async function(id, model){
    console.log(id);
    if (! (/[a-fA-F0-9]{24}/.test(id))){
        return errors.error({
            code  : '104',
            path  : 'id',
            value : id
        });
    }

    try{
        let
        obj = await model.findById(id).where('_status').nin([-1]).populate({
            path : 'roles.service',
            select : '_snid name _status _id',
            match : {
                _status : { $gte : 1 }
            }
        });

        if(!obj)
            return errors.error({
                code  : '108',
                path  : 'id',
                value : id
            });

        return errors.success(obj);
    }catch(err){
        return err;
    }
};

let
lite = async function(id, model){
    if(!mongoose.Types.ObjectId.isValid(id)){
        return errors.error({
            code  : '104',
            path  : 'id',
            value : id
        });
    }

    try{
        let
        obj = await model.findById(id).where('_status').nin([-1]).populate({
            path : 'roles.service',
            select : '_snid name _status _id',
            match : {
                _status : { $gte : 1 }
            }
        });

        if(!obj)
            return errors.error({
                code  : '108',
                path  : 'id',
                value : id
            });

        return errors.success(obj);
    }catch(err){
        return err;
    }
};

export default {
    name : '$get',
    fn   : function(param, type){
        return type === 'lite' ? lite(param, this) : fn(param, this);
    }
};
