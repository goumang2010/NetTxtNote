//传入配置参数
//生成数据库模型
/// <reference path="../../../Scripts/typings/main.d.ts" />
import * as _               from 'lodash';
import * as mongoose        from 'mongoose';
import * as autoIncrement   from 'mongoose-auto-increment';
let uniqueValidator = require( 'mongoose-unique-validator');

import errors from '../errors';
import * as common from './_common';

import commonSchema from './schema';

class _Model {
    options;
    static serialNumber = '_snid'; //自增 id 字段名
      __conf;
      __name;
      __schema: mongoose.Schema;
      __model: mongoose.Model<mongoose.Document>;
    constructor(conf) {
        // _Model.name   = conf.name;
           this.setOption(conf);
          this.__name=conf.name ;
          this.__conf = conf.schema;
          this.__conf['_status'] = commonSchema('_status');
          this.__schema = new mongoose.Schema(this.__conf, this.options);
          //在schema中添加共用方法
          //目前仅添加了toJSON方法
          for (let key in common.sets) {
              this.__schema.set(key, common.sets[key]);
          }
          // 添加公共静态方法
          if (_.isArray(common.statics_arr)) {
              common.statics_arr.forEach((v) => {
                  if (v.name && v.fn) {
                      this.__schema.static(v.name, v.fn);
                  }
              });
          }
          // 添加配置参数中的静态方法
          // 若重名，将覆盖公共的静态方法
          if (_.isArray(conf.statics_arr)) {
              conf.statics_arr.forEach((v) => {
                  v = v.default || v;
                  if (v.name && v.fn) {
                      this.__schema.static(v.name, v.fn);
                  }
              });
          }
          // 添加第三方库
          //设置自增
          this.__schema.plugin(autoIncrement.plugin, {
              model: this.__name,
              //_snid
              field: _Model.serialNumber,
              startAt: 1
          });
          this.__schema.plugin(uniqueValidator, {
              "message": '106'
          });
          // Add private plugins
          if (_.isArray(conf.plugins)) {
              conf.plugins.forEach((v) => {
                  v = v.default || v;
                  if (v.fn) {
                      if (v.options)
                          this.__schema.plugin(v.fn, v.options);
                      else
                          this.__schema.plugin(v.fn);
                  }
              });
          }
          // Add common validations
          if (_.isArray(common.validations_arr)) {
              common.validations_arr.forEach((x) => {
                  let v = x.fn(this.__name);
                  if (v.fn && v.path && v.message) {
                      let vpath = v.path.split('->');
                      let
                          path = this.__schema.path(vpath[0]);
                      for (let i = 1; i < vpath.length; i++) {
                          path = path.schema.path(vpath[i]);
                      }
                      if (path) {
                          path.validate(v.fn, v.message);
                      }
                  }
              });
          }

          //配置参数中的验证方法
          if (_.isArray(conf.validations_arr)) {
              conf.validations_arr.forEach((v) => {
                  v = v.default || v;
                  if (v.fn && v.path && v.message) {
                      v.path = v.path.split('->');
                      let
                          path = this.__schema.path(v.path[0]);

                      for (let i = 1; i < v.path.length; i++) {
                          path = path.schema.path(v.path[i]);
                      }

                      path.validate(v.fn, v.message);
                  }
              });
          }
          // Schema callback
          if (_.isFunction(conf.schemaCallback)) {
              conf.schemaCallback(this.__schema);
          }

          // Model 的创建需要在 schema 与 schema 方法创建之后
          this.__model = mongoose.model(this.__name, this.__schema);

    }
    private setOption(conf) {
        this.options = conf.options;
        this.options['collection'] = conf.name;
        this.options['timestamps'] = {
            createdAt: '_createdAt',
            updatedAt: '_updatedAt'
        };
    }
    public model() {
        return this.__model;
    }
}
let
Model = function(param){
    return new _Model(param);
};
export {
    Model
};
