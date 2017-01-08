declare namespace Express {
	interface Request {
        _routeWhitelists: any;
    }
}
declare module "winston" {
	export default {};
}
//ES6 method
interface Array<T> {
    find(predicate: (search: T) => boolean): T;
	includes(predicate: (search: T) => boolean): boolean;
}
//nodejs
declare module NodeJS {
    export interface Global {
		$g: any;
    }
}
