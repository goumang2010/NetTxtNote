/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
import * as  mongoose    from 'mongoose';
import {conf_iterator} from '../_trim/_common_method'
import commonSchema    from '../schema';
import * as Media from "../Media";
import * as User from "../User";

const
    modelName = 'Category';

const
    schema = {
        name: {
            type: String,
            required: true
        },
        cover: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Media.name
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User.name,
            required: true
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
        .index({ name: 1, user:1 });
}

export  {
    modelName,
    schema,
    inspectSchema,
    schemaOptions,
    schemaCallback
};
