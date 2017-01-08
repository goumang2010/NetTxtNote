import * as mongoose from 'mongoose';
import errors from '../../errors';
import * as _ from 'underscore';
import * as util from 'util';
//展开object
function* conf_iterator(obj, father = null) {
    //console.log(obj);

    if (typeof obj === 'object') {
        if (!obj.hasOwnProperty('type')) {
            let keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let newname = "";
                if (father) {
                    newname = [father, key].join('_');
                }
                else {
                    newname = key;
                }
                if (obj[key] !== null) {
                    yield* conf_iterator(obj[key], newname);
                }
            }
        }
        else {
                yield [father, obj];
        }
    }
    else {
        if (util.isArray(obj)) {
            let innerobj = obj[0];
            yield [father, { type: Array, innertype: innerobj.type, required: innerobj.required ? true : false, default: innerobj.default ? [innerobj.default] : [] }];
        }
        else {
            yield [father, { type: obj }];
        }
        
    }
}

async function convertType(v, inspect, path) {
    
    let targetType = inspect.type;
   // console.log(targetType);
    if (targetType && targetType.schemaName === 'ObjectId') {
        //console.log('dafcad');
        return /[a-fA-F0-9]{24}/.test(v) ? new mongoose.Types.ObjectId(v) : errors.error({
            code: '104',
            path: path,
            value: v,
            info:'objectID is wrong'
        });
    }

        try {
            switch (targetType) {
                case Number:
                    return parseInt(v);
                case Date:
                    if (!util.isDate(v)) {
                        return new Date(v);
                    }
                    return v;
                case Array:
                    
                    if (!util.isArray(v)) {
                       
                        let arr = v.split(',');
                        if (inspect.innertype) {
                           // console.log(path + ":233:::" + v);
                            let newtype = inspect.innertype;
                            let newarr=[];
                            for (let x of arr) {
                               // console.log(newtype);
                                newarr.push(await convertType(x, {type: newtype }, path))
                            }
                            //console.log(newarr);
                            return newarr;
                        }
                        return arr;
                    }
                    return v;
                case Boolean:
                    if (typeof v === 'string') {
                        return v === 'true' ? true : false;
                    }
                    return v;
                case RegExp:
                    if (!util.isRegExp(v)) {
                        return new RegExp(v);
                    }
                    return v;              

                default:
                    return v;
            }
        } catch (e) {
            let
                error = {
                        code: '104',
                        value: v,
                        path: path,
                        info:e
                    };

            return Promise.reject(error);
        }
    };
export { conf_iterator,convertType};