/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
import * as mongoose   from 'mongoose';
import {conf_iterator} from '../_trim/_common_method'
import commonSchema    from '../schema';
import * as MediaForm from "../MediaForm";

const
    modelName = 'Media';

const
    schema = {
        name: {
            type: String,
            required: true
        },
        form: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MediaForm.name,
            required: false
        },
        path: String,
        description: String
    };

const
    inspectSchema = Array.from(conf_iterator(schema));

const
    schemaOptions = {};
const
    schemaCallback = function (schema: mongoose.Schema) {
        schema
            .index({ name: 1, path: 1 }, { unique: true });
    }
export  {
    modelName,
    schema,
    inspectSchema,
    schemaOptions,
    schemaCallback
};
