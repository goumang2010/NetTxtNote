//该文件为元编程，修改后注意同步模板，模板位于/util/preload/templates/schema
import * as mongoose from 'mongoose';
import errors   from '../../errors';
import {inspectSchema} from './conf';
import {statics} from '../_trim'


let
requestParamsConf = {
    filter : { // MongoDB filter对象
        type     : 'JSON',
        required : false
    }
};

let
queryRecords = async function (data, model): Promise<any>{
    let
        trimeddata = data.filter;
    try {
        if (trimeddata !== undefined && trimeddata !== null) {
            trimeddata = await statics.$extractParamForQuery.fn(trimeddata, inspectSchema);
        }
        else {
            trimeddata = {};
        }
        let
            count = model.count(trimeddata);

        count = await count.exec();

        return errors.success({
            count
        });
    }
    catch (err) {
       // console.log(JSON.stringify(err, null, 4));
        return errors.format(err);
    }
};

let
fn = async function(body){
    let model = this
    try {
        let
            res = await queryRecords(body, model);
        return res;
    } catch (err) {
        console.log(JSON.stringify(err, null, 4));
        return err;
    }
};

export default {
    name : '$count',
    fn   : fn
};
