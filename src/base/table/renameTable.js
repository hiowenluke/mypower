
const nodber = require('../..');

/** @name nodber.renameTable */
const fn = async (oldTableName, newTableName) => {
	const result = await nodber.proxy({oldTableName, newTableName});
	return result.warningStatus === 0;
};

module.exports = fn;
