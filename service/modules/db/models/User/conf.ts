/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
import * as mongoose   from 'mongoose';
import * as UserGroup from "../UserGroup";
import commonSchema    from '../schema';
import {conf_iterator} from '../_trim/_common_method'

const
    modelName = 'User';

const
    emailSchema = commonSchema('email'),
    phoneSchema = commonSchema('phone');

const
    schema = {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password: commonSchema('password'),
        email: emailSchema,
        phone: phoneSchema,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserGroup.name,
            required: true
        }
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

