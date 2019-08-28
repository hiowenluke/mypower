
const nodber = require('../../');

/** @name nodber.cloneTableStructureAndData */
const fn = async (newTableName, oldTableName) => {
	const sql = `
		delimiter ||
		create table {newTableName} like {oldTableName} ||
		insert into {newTableName} select * from {oldTableName} ||
		delimiter ;
	`;
	return await nodber.exec(sql, {newTableName, oldTableName});
};

module.exports = fn;
