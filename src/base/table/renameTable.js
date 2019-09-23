
const my = require('../..');

/** @name my.renameTable */
const fn = async (oldTableName, newTableName) => {
	const result = await my.proxy({oldTableName, newTableName});
	return result.warningStatus === 0;
};

module.exports = fn;
