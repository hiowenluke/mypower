
const nodber = require('./');

/** @name nodber.count */
const fn = async (sqlCount, {data = {}} = {}) => {
	const result = await nodber.exec(sqlCount, data);
	return result[0].count;
};

module.exports = fn;
