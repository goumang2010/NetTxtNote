//开发模式下采用随机端口
var randomstring = require("randomstring");
import * as path from 'path';
let
	config = {
		production: {
			server: {
				host: '127.0.0.1',
				port: 6010
			},
			url: 'https://srv.note.chuune.cn',
			database: {
				client: 'mongodb',
				connection: '127.0.0.1:27017/nettxtnote_production'
			}
		},
		development: {
			server: {
				host: '127.0.0.1',
                port: 8+randomstring.generate({
                    length: 3,
                    charset: 'numeric'
                })
			},
			url: 'https://srv-d.srv.note.chuune.cn',
			database: {
				client: 'mongodb',
                connection: '127.0.0.1:27017/nettxtnote_development'
			}
		},

		// Used when express behind proxies
        trustedIPs: ['::ffff:127.0.0.1', '127.0.0.1', '54.213.133.73', '173.4.11.128'],

		// Store log files
        logRootPath: path.join(__dirname, '/log')
	};

export { config};
