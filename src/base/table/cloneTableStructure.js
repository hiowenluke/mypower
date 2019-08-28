
const nodber = require('../../');

/** @name nodber.cloneTableStructure */
const fn = async (newTableName, oldTableName) => {
	const sql = `create table {newTableName} like {oldTableName}`;
	return await nodber.exec(sql, {newTableName, oldTableName});
};

module.exports = fn;
