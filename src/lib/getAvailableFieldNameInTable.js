
const nodber = require('../');

/** @name nodber.lib.getAvailableFieldNameInTable */
const fn = async (tablename, fieldnames) => {
	fieldnames = fieldnames.split(',');

	for (let i = 0; i < fieldnames.length; i++) {
		const fieldname = fieldnames[i];
		if (await nodber.lib.isTableFieldExists(tablename, fieldname)) {
			return fieldname;
		}
	}
};

module.exports = fn;
