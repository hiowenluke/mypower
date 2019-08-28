
const nodber = require('./');
const caller = require('caller');

const getPurposeFromCaller = (caller) => {
	// "/aaa/bbb/cccc.js" => "ccc"
	return caller.match(/\/([^/]+)?\.js$/i)[1];
};

/** @name nodber.proxy */
const fn = async (...args) => {
	let pathToCaller;

	const lastParam = args[args.length - 1];
	if (typeof lastParam === 'string' && lastParam.substr(0, 1) === '/') {
		pathToCaller = lastParam;
		args.pop();
	}

	const purpose = getPurposeFromCaller(pathToCaller || caller());
	const sql = nodber.sqls(purpose, ...args);
	const result = await nodber.exec(sql);

	return result;
};

module.exports = fn;
