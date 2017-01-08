/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
import * as mongoose    from 'mongoose';
import {conf_iterator} from '../_trim/_common_method'
import commonSchema    from '../schema';

const
    modelName = 'UserGroup';

const
    schema = {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        code: {
            type: Number,
            required: true,
            index: true
        },
        description: String
    };

const
    inspectSchema = Array.from(conf_iterator(schema));

const
    schemaOptions = {};

const
    schemaCallback = function (schema: mongoose.Schema) {
        schema
            .index({ name: 1, code: 1 }, { unique: true });
    }

export  {
    modelName,
    schema,
    inspectSchema,
    schemaOptions,
    schemaCallback
};

