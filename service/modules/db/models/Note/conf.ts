/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
import * as  mongoose    from 'mongoose';
import commonSchema    from '../schema';
import {conf_iterator} from '../_trim/_common_method'
import * as User from "../User";
import * as Category from "../Category";
import * as Media from "../Media";
const
    modelName = 'Note';

const
    schema = {
        name: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Category.name,
            required: true
        },
        media: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Media.name,
            required: false
        }],
        txt: String
    };

const
    inspectSchema = Array.from(conf_iterator(schema));

const
    schemaOptions = {};

const
    schemaCallback = function (schema: mongoose.Schema) {
        schema
            .index({ name: 1 }, { unique: true });
    }

export  {
    modelName,
    schema,
    inspectSchema,
    schemaOptions,
    schemaCallback
};
