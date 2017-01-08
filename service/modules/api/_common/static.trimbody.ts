import * as _ from 'lodash';
export default function trimbody({body, status = 1, pagi = false}) {
    body.select = '-_status';
    if (body.filter) {
        //console.log(body.filter);
        body.filter = _.extend({},JSON.parse(body.filter), { '_status': status });
        //console.log(body.filter);
       // body.filter._status = status
    }
    else {
        body.filter = {};
        body.filter._status = status
    }
    if (pagi) {
        body.limit = body.limit || 10;
        body.page = body.page || 1;
    }
    return body;
}