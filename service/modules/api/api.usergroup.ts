
import * as express from 'express';

import { models } from '../db';

import { statics } from './_common';

let router = express.Router();
let model_default: any = models.UserGroup;
let model = model_default.model;
//�����ڷ��������й��ˣ����Բ����ڴ˲������ظ�����
router.get('/count', async function (req, res, next) {
    try {
        let body = req.query;
        body = statics.$trimbody({ body });
        let result = await model.$count(body);
        if (result.code !== 200)
            return next(result);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

// Pagination
router.get('/pagination', async function (req, res, next) {
    try {
        let body = req.query;
        body = statics.$trimbody({ body, pagi: true });
        let result = await model.$paginate(body);
        if (result.code !== 200)
            return next(result);
        res.json(result);
    } catch (err) {
        next(err);
    }
});



// Single get
router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await model.$get(id);
        if (result.code !== 200)
            return next(result);

        res.json(result);
    } catch (err) {
        next(err);
    }
});

// Multiple get @ids=id,id,...
router.get('/multiple/:ids', async function (req, res, next) {
    let idarr = req.params.ids.split(',');
    try {
        let resarr = await Promise.all(idarr.map(async (id) => {
            let result = await model.$get(id);
            return result.data;
        }));
        res.json({
            code: 200,
            data: resarr
        });
    }
    catch (err) {
        next(err);
    }
});

//create record
router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let
            result = await model.$create(body);
        if (result.code !== 200)
            return next(result);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

// Single edit
router.put('/:id', async function (req, res, next) {
    try {
        let result = await model_default.$update(req);
        if (result.code !== 200)
            return next(result);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


// Multiple delete
router.delete('/', async function (req, res, next) {
    try {
        let
            result = await model_default.$delete(req.body.ids);
        if (result.code !== 200)
            return next(result);
        res.json(result);
    } catch (err) {
        next(err);
    }
});
export default router;