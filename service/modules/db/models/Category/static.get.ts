
import * as mongoose from 'mongoose';

import errors   from '../../errors';

let
fn = async function(req, model){
    let
    id    = req.params.id;

    if(! mongoose.Types.ObjectId.isValid(id)){
        return errors.error({
            code  : '104',
            path  : 'id',
            value : id
        });
    }

    try {
        //$nin selects the documents where:
        //the field value is not in the specified array or
        //the field does not exist.
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
