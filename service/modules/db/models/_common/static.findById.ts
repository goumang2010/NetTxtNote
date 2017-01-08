/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
/// <reference path="../../../../Scripts/self_typings/self.d.ts"/>
/** 用于获取当前所绑定 Model 中的数据
*/
import * as _        from 'lodash';
import * as mongoose from 'mongoose';

import errors   from '../../errors';

// @status Array contains: [-1, 0, 1], required: false
let fn = async function(path, id, status=null){
  //判断id是否有效
    if (!/[a-fA-F0-9]{24}/.test(id)){
        return errors.error({
            code  : '104',
            path  : path,
            value : id
        },null);
    }

    try{
        let res = this.findById(id);
        if(_.isArray(status))
            res = res.where('_status').in(status);

        res = await res;

        if(!res){
            return errors.error({
                code  : '108',
                path  : path,
                value : id
            },null);
        }

        return res;
    }catch(err){
        return Promise.reject(err);
    }
};

export default {
    name : '$findById',
    fn   : fn
};
