
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import errors from '../../errors';

let
statics = {};

let
requestParamsConf = {
    name : {
        required : true
    },
    password : {
        required : true
    }
};

let
createRecord = async function(data, model){
    try{
        let
        res = await model.findOne({
            name : data.name
        }).where('_status').equals(1).select('password');

        if(!res){
            return errors.error({
                code  : '214'
            });
        }

        res = await bcrypt.compareSync(`|-:${data.password}:-|`, res.password);

        return res ? errors.success(res) : errors.error({
            code  : '214'
        });
    }catch(err){
        return errors.format(err);
    }
};

let
fn = async function(data){
    let
        model = this;

    try {
        let
        res = await createRecord(data, model);

        return res;
    } catch(err) {
        return err;
    }
};

export default {
    name : '$validatePassword',
    fn   : fn
};
