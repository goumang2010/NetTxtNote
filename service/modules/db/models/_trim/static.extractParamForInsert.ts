
import * as _      from 'lodash';

import errors from '../../errors';
import {convertType} from './_common_method'
//根据配置文件处理默认值和要求值

let
    fn = async function (origin, inspectSchema) {
        //console.log(inspectSchema);
        var
            res = {},
            err = []
        for (let ele of inspectSchema) {
            let key = ele[0],
                value:any;
             //不允许指定verified
            if (key.indexOf('verified')>=0) {
                continue;
            }
            if (origin[key] === undefined || origin[key]===null) {
                if (ele[1].default) {
                    value = ele[1].default;
                }
                else {
                    if (ele[1].required) {
                        err.push({
                            code: 103,
                            path: key
                        });
                    }
                    else {
                        continue;
                    }
                }
            }
            else {
                //console.log(ele[1]);
                value = await convertType(origin[key], ele[1], key);
                //console.log(typeof value);
            }

            //排除首位是下划线的情况
            if (key.indexOf('_') > 0) {
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
               // console.log(key + "----::"+typeof value +"::-----" + value);
                res[key] = value;
            }
            
        }
        if (_.isEmpty(res)) {
            err.push(errors.error({
                code: '107'
            }, null));
        }

        return err.length > 0 ? errors.error(err) : res;
    };
export default {
    name : '$extractParamForInsert',
    fn   : fn
};
