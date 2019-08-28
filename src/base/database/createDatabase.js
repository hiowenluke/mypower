
const nodber = require('../../');

/** @name nodber.createDatabase */
const fn = async (databaseName) => {
	const result = await nodber.proxy(databaseName);
	return result.warningStatus === 0;
};

module.exports = fn;
