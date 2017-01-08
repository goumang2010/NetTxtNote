/// <reference path="../../../Scripts/typings/main.d.ts" />
/// <reference path="../../../Scripts/self_typings/self.d.ts" />
import * as _        from 'lodash';
import * as mongoose from 'mongoose';

import * as  errors from '../errors';

let Schema = mongoose.Schema;
if (!global.$g) {
    global.$g = {};
}
if (!global.$g.util) {
    global.$g.util= {};
}
let  validate = global.$g.util.validate;

let  commonSchema = {};

commonSchema['email'] = {
    value: {
        type: String,
        default: '',
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return !v ? true : validate.email(v);
            },
            message: '104'
        }
    },
    verified: {
        type: Boolean,
        default: false
    }
};

commonSchema['phone'] = {
    value: {
        type: String,
        default: '',
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return !v ? true : validate.phone(v);
            },
            message: '104'
        },
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    }
};

commonSchema['password'] = {
    type: String,
    writable: true,
    required: true
};

let
    statusRange = [-1, 0, 1],
    validateStatus = function(v) {
        return statusRange.includes(v);
    };

commonSchema['_status'] = {
    type: Number,
    validate: {
        validator: validateStatus,
        message: '104'
    },
    default: 1 //用于标明数据/对应事务的状态: 1 可用, 0 禁用, -1 删除
};

export default function(name) {
    return commonSchema[name] ? _.cloneDeep(commonSchema[name]) : null;
};
