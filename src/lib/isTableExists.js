
const nodber = require('../');

/** @name nodber.lib.isTableExists */
const fn = async (tablename) => {
	const result = await nodber.exec(`SELECT * FROM sysobjects WHERE name= '${tablename}'`);
	return !!(result && result[0]);
};

module.exports = fn;
