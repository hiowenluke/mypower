
const nodber = require('../../');

/** @name nodber.renameTable */
const fn = async (oldName, newName) => {
	const result = await nodber.proxy({old_tableName: oldName, new_tableName: newName});
	return result.warningStatus === 0;
};

module.exports = fn;
