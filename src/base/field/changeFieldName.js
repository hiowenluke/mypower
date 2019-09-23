
const my = require('../..');

/** @name my.changeFieldName */
const fn = async (tableName, oldFieldName, newFieldName) => {
	return await my.changeField(tableName, oldFieldName, newFieldName);
};

module.exports = fn;
