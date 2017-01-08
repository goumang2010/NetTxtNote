//���ļ�ΪԪ��̣��޸ĺ�ע��ͬ��ģ�壬ģ��λ��/util/preload/templates/schema
import errors from '../../errors';
import * as _common from '../_common';
import * as _trim from '../_trim';
import {inspectSchema} from './conf'

let
    formatRequestParams = async function (data): Promise<any> {
        data =await _trim.statics.$extractParamForInsert.fn(data, inspectSchema);
        return data;
    };

let
    createRecord = async function (data, model) {
        let
            createRecord = new model(data);
        // console.log(createRecord);
        try {
            let
                result = await createRecord.save();
            result = await model.$get(result._id.toString(), 'lite');

            return result;
        } catch (err) {
           // console.log(JSON.stringify(err,null,4));
            return errors.format(err);
        }
    };

let
    fn = async function (reqbody) {
        let
            model = this,
            data = await formatRequestParams(reqbody);
        try {
            let
                res = await createRecord(data, model);
            return res;
        } catch (err) {
            console.log(JSON.stringify(err, null, 4));
            return err;
        }
    };

export default {
    name: '$create',
    fn: fn
};
