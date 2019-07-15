
const nodber = require('../');

/** @name nodber.lib.isEmptyTable */
const fn = async (tablename) => {
	return !await nodber.lib.isRecordExists(tablename);
};

module.exports = fn;
