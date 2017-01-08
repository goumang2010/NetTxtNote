//该文件为元编程，修改后注意同步模板，模板位于/util/preload/templates/schema
import * as mongoose from 'mongoose';
import errors   from '../../errors';
import {inspectSchema} from './conf';
import {statics} from '../_trim'

let
formatPopulation = async function(data){
    if(!data.population)
        return data;

    for(let key in data.population){
        let
        op = {
            path : key
        };

        if(data.population[key].select)
            op['select'] = data.population[key].select;

        if(data.population[key].options)
            op['options'] = data.population[key].options;

        if(data.population[key].match)
            op['match'] = data.population[key].match;

        data.population[key] = op;
    }

    return data;
};
//exclude password
let
formatRequestParams = async function(data){
    data.select  = data.select || '';
    data.select += ' -password';

    data.limit   = data.limit < 1 ? 10 : data.limit > 100 ? 100 : data.limit;
    data.page    = data.page  < 1 ? 1  : data.page;
    data.skip    = data.skip  < 0 ? 0  : data.skip;

    return data;
};

let
queryRecords = async function(data, model){
    try {
        data = await formatRequestParams(data);
        data = await formatPopulation(data);
    } catch(err) {
        return err;
    }
    let
        trimeddata = data.filter;
    try {
        if (trimeddata !== undefined && trimeddata !== null) {
            trimeddata = await statics.$extractParamForQuery.fn(trimeddata, inspectSchema);
        }
        else {
            trimeddata = {};
        }
        let
        query = model.find(trimeddata);

        query = query
            .limit(data.limit)
            .skip(data.limit * (data.page - 1))
            .sort(data.sort);

        if(data.population){
            for(let key in data.population){
                query = query.populate(data.population[key]);
            }
        }

        if(data.select){
            query = query.select(data.select);
        }

        query = await query.exec();

        return errors.success({
            limit : data.limit,
            page  : data.page,
            skip  : data.skip,
            list  : query
        });
    }catch(err){
        return errors.format(err);
    }
};

let
fn = async function(data){
    let
        model = this;

    try {
        let
        res = await queryRecords(data, model);
        return res;
    } catch(err) {
        return err;
    }
};

export default {
    name : '$paginate',
    fn   : fn
};
