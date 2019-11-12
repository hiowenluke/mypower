
const my = require('../..');

/** @name my.getMaxId */
const fn = async (tableName, idName, where) => {

	if (!idName) {
		idName = 'id';
	}

	else

	// If the argument idName is where
	if (typeof idName === 'object' || typeof idName === 'string' && idName.indexOf(' ') >= 0) {
		where = idName;
		idName = 'id';
	}

	return await my.getMaxFieldValue(tableName, idName, where);
};

module.exports = fn;
