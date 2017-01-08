/// <reference path="../../../../Scripts/typings/main/ambient/mongoose/index.d.ts"/>
/// <reference path="../../../../Scripts/typings/main/ambient/mongoose-auto-increment/index.d.ts"/>
import * as mongoose        from 'mongoose';
import { Model }       from '../generator';
import {modelName, schema, schemaOptions, schemaCallback}   from './conf';
import { statics_arr} from './static_pre_conf';
import { validations_arr } from './validation_pre_conf';


let
    model = Model({
        schema,
        options:schemaOptions,
        name: modelName,
        statics_arr,
        validations_arr,
        schemaCallback
    });

let
    _model = model.model();

export {
modelName as name,
_model    as model
};