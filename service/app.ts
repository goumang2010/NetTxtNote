/// <reference path="Scripts/typings/main.d.ts" />
/// <reference path="Scripts/self_typings/self.d.ts" />
import * as express        from 'express';
import * as bodyParser     from 'body-parser';
import * as helmet        from 'helmet';
import * as  winston        from 'winston';
import * as rts from './modules/api';
var expressWinston = require('./node_modules_private/express-winston');

import {config}    from './config';
// Import routers
let	routers = [];

routers.push('./modules/api');

// Init app
let
	app = express();

let
	trustedIPs = config.trustedIPs;
app.set('trust proxy', function(ip) {
    if (trustedIPs.includes(ip))
        return true;
    else
        return false;
});

// Use helmet to protect app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

// For parsing application/json
app.use(bodyParser.json());
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.send('Bad request.');
});

// express-winston logger makes sense BEFORE the router
expressWinston.requestWhitelist.push('body');
app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: `${config.logRootPath}/netnote-info.log`
        })
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorStatus: true
}));

// Load routers
app.use('/api',rts.default);
// Error handling
app.use(function(err, req: express.Request, res, next) {
    if (typeof err.code !== 'undefined') {
        expressWinston.loggerSkip(req);
        return next(err);
    }

    expressWinston.extractAndFormatError(req, err);

    let
		result = {
			code: 400,
			message: 'Bad request.',
			errors: []
		};

    if (err instanceof SyntaxError) {
        result.errors.push({
            code: 101,
            message: 'Malformed json',
            body: err.body
        });
    } else {
        result.errors.push({
            code: 1,
            message: err.message,
            body: err.body
        });
    }

    return next(result);
});

// express-winston errorLogger makes sense AFTER the router
app.use(expressWinston.errorLogger2({
    transports: [
        new winston.transports.File({
            filename: `${config.logRootPath}/netnote-error.log`
        })
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorStatus: true,
    dumpExceptions: true,
    showStack: true
}));

app.use(function(err, req:express.Request, res, next) {
    req._routeWhitelists.res.push('body');

    res.json(err);
});

// 必须使用此种方式导出 app, 否则 server.js 中调用 app.listen 会报错
module.exports = app;
