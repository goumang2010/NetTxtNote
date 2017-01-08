require('babel-register');
require('babel-polyfill');

import { conf_iterator } from '../modules/db/models/_trim/_common_method';
import test from 'ava';
let
    schema = {
        name: {
            type: String,
            required: true
        },

        cover: {
            form: {
                type: String
            },
            value: {
                type: String
            }
        },
        description: String
    };

let convert = Array.from(conf_iterator(schema));

test('conf_iterator', async (x) => {
    for (let ele of convert) {
       // console.log(ele);
        x.is(ele[1].hasOwnProperty('type'), true);
    } 
});

test('convertType', async (x) => {
    for (let ele of convert) {
        console.log(String);
        x.is(ele[1].type, String);
    }
});