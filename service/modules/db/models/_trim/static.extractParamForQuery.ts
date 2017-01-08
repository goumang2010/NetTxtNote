
import * as _        from 'lodash';
import * as mongoose from 'mongoose';

import errors from '../../errors';
import {convertType} from './_common_method'


let
    fn = async function (origin, inspectSchema:Array<Array<any>>) {
        //检查schema时增加自动生成的字段
        inspectSchema.push(['_snid', {}]);
        inspectSchema.push(['_status', {}]);
        var
            res = {},
            err = []
        for (let ele of inspectSchema) {
            let key:string = ele[0],
                value;
            if (origin[key] !== undefined && origin[key] !== null) {
                value = await convertType(origin[key], ele[1], key);
            }
            else {
                continue;
            }
            //将数据恢复为schema结构
            //排除首位是下划线的情况
            if (key.indexOf('_')>0) {
                let keyarr = key.split('_');
                if (res[keyarr[0]] === undefined) {
                    res[keyarr[0]] = {};
                }
                let count = keyarr.length;
                for (let i = 1; i < count; i++) {
                    let li = keyarr[i - 1];
                    let ci = keyarr[i];
                    if (res[li][ci] === undefined) {
                        if (i === (count - 1)) {
                            res[li][ci] = value;
                        }
                        else {
                            res[li][ci] = {};
                        }
                    }
                }
            }
            else {
                res[key] = value;
            }
        }

        return res;
    };

export default {
    name : '$extractParamForQuery',
    fn   : fn
};
