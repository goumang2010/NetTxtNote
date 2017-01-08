//该文件为元编程，修改后注意同步模板，模板位于/util/preload/templates/schema
import * as mongoose from 'mongoose';
import errors   from '../../errors';
import {inspectSchema} from './conf';
import {statics} from '../_trim'

let
formatRequestParams = async function(oriData, model):Promise<any>{
    let
    data = {},
    id   = null;

    try {
        let
        res = await model.$findById('id', oriData.id, [1]);

        if(!res)
            return errors.error({
                code  : '108',
                path  : 'id',
                vaule : oriData.id
            });

        id = res._id;
    } catch (err) {
       // console.log(JSON.stringify(err, null, 4));
        return Promise.reject(err);
    }
    data =await statics.$extractParamForUpdate.fn(oriData.data, inspectSchema);
    return {
        id,
        data : {
            $set : data
        }
    };
};

let
updateRecord = async function(data, model){
    try {
        data = await formatRequestParams(data, model);
    }catch(err){
        return err;
    }

    let
    result;

    try{
        result = await model.findOneAndUpdate({
            _id : data.id
        }, data.data);
    } catch (err) {
       // console.log(JSON.stringify(err, null, 4));
        return errors.format(err);
    }

    try{
        result = await model.findById(result._id.toString()).select('-password');
        return errors.success(result);
    } catch (err) {
        //console.log(JSON.stringify(err, null, 4));
        return errors.format(err);
    }
};

let
fn = async function(reqbody){
    let
        model = this;

    try {
        let
            res = await updateRecord(reqbody, model);

        return res;
    } catch (err) {
        console.log(JSON.stringify(err, null, 4));
        return err;
    }
};

export default {
    name : '$update',
    fn   : fn
};
