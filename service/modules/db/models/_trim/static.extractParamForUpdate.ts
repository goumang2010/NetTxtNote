
/// <reference path="../../../../Scripts/typings/main/ambient/lodash/index.d.ts"/>
import * as _   from 'lodash';

import errors from '../../errors';
import {convertType} from './_common_method';

let
fn = async function (origin, inspectSchema) {
    //console.log('update start');
    //console.log(origin);
    //console.log(inspectSchema);
    let
        res = {};
    for (let ele of inspectSchema) {
        let key: string = ele[0],
            value;
        //不允许指定verified
        if (key.indexOf('verified') >= 0) {
            continue;
        }
        if (origin[key] !== undefined && origin[key] !== null) {
            value = await convertType(origin[key], ele[1], key);
        }
        else {
        //没有该字段则跳过
            continue;
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
            res[key] = value;
        }

    }
    return _.isEmpty(res) ? errors.error({
        code : '107'
    }, null) : res;
};

export default {
    name : '$extractParamForUpdate',
    fn   : fn
};
