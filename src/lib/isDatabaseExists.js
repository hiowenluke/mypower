
const nodber = require('../');

/** @name nodber.lib.isDatabaseExists */
const fn = async (databaseName) => {
	const sql = nodber.sqls('isDatabaseExists', databaseName);
	const result = await nodber.exec(sql);
	return !!(result && result[0]);
};

module.exports = fn;
