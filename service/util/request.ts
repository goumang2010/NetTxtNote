
import * as _     from 'lodash';
import * as axios from 'axios';

const commonHTTPHeaders = {
    'Content-Type' : 'application/json'
};

const HTTPSuccessFn  = function(res) {
    return res.data.code !== 200 ? Promise.reject(res.data) : res.data;
};

const HTTPFailedFn   = function(err) {
    return Promise.reject(err);
};

export default
    function({ method = 'get', headers = {}, url='', params = {}, data = {} } = {}){
        if(!_.isFunction(axios[method]))
            return Promise.reject({
                code    : 500,
                message : `Error: HTTP method "${method}" is undefined.`
            });

        method = method.toLowerCase();

        return axios({
                url,
                method,
                params, // the URL parameters to be sent with the request
                data,   // the data to be sent as the request body, only applicable for request methods 'PUT', 'POST', and 'PATCH'
                headers : commonHTTPHeaders
            })
            .then(HTTPSuccessFn)
            .catch(HTTPFailedFn);
    };
