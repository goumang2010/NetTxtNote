/// <reference path="Scripts/typings/main.d.ts" />
/// <reference path="Scripts/self_typings/self.d.ts" />
import {config} from './config';

let env:string = process.env.NODE_ENV || 'development';
let mode = config[env.trim()];
if (!mode) {
	console.error(`[Error] Cannot find configuration about NODE_ENV:${env}`);
} else {
	global.$g = global.$g || {};
	global.$g.config = mode;
	global.$g.util = require('./util');
	require('./modules/db');

	let app = require('./app');
	app.listen(mode.server.port, function() {
		console.log('Node app is running, port:', mode.server.port);
	});
}
