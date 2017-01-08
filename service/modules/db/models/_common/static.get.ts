//仅返回激活的值
import * as mongoose from 'mongoose';

import errors   from '../../errors';

let
requestParamsConf = {
    select : { // 返回数据中包含的 path
        required : false,
        // default  : '' // 此处是 mongoose 的 select 规则, 如果未定义且请求未传入, 则返回所有 path
    }
};

let
fn = async function (id, data) {
    let model: mongoose.Model<mongoose.Document> = this;
    if (!(/[a-fA-F0-9]{24}/.test(id))) {
        return errors.error({
            code  : '104',
            path  : 'id',
            value : id
        });
    }
    //exclude password
    let
    select  = data.select ? data.select : '';
    select += ' -password';
    select += ' -_status';
    try{
        let
        obj = await model.findById(id).where('_status').in([1]).select(select);

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
    fn   : fn
   
};
