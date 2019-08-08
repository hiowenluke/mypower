
const nodber = require('../');

/** @name nodber.lib.isEmptyTable */
const fn = async (tableName) => {
	return !await nodber.lib.isRecordExists(tableName);
};

module.exports = fn;
