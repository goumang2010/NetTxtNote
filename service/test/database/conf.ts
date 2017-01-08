require('../../index.js');

import { inspectSchema } from '../../modules/db/models/User/conf';
import test from 'ava';

let convert = Array.from(inspectSchema);

test('inspectSchema', async (x) => {
    for (let ele of convert) {
         console.log(ele);
        x.is(ele[1].hasOwnProperty('type'), true);
    }
});
