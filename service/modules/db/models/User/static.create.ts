import * as bcrypt from 'bcrypt';
import errors from '../../errors';
import * as _common from '../_common';
import * as _trim from '../_trim';
import {inspectSchema} from './conf'

let
    formatRequestParams = async function (data): Promise<any> {
        data = _trim.statics.$extractParamForInsert.fn(data, inspectSchema);
        //修正phone及email的数据格式
        //const expandarr = ["phone", "email"];
        //expandarr.map(function (name) {
        //    if (data[name]) {
        //        let tmp = data[name];
        //        //将不会改变tmp
        //        data[name] = {
        //            value: tmp,
        //            verified: false
        //        };
        //    }
        //});
        //密码加盐
        let
            _salt = bcrypt.genSaltSync(10),
            _pwd = bcrypt.hashSync(`|-:${data.password}:-|`, _salt);
        data['password'] = _pwd;
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
            //console.log(JSON.stringify(err,null,4));
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
            return err;
        }
    };

export default {
    name: '$create',
    fn: fn
};
