
const nodber = require('../../');

/** @name nodber.isEmptyTable */
const fn = async (tableName) => {
	return !await nodber.isRecordExists(tableName);
};

module.exports = fn;
