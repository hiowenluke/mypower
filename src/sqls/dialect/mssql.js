
const me = {

	// Because there may be multiple primary keys, sort by ordinal_position
	getPrimaryKeys: `SELECT column_name as primaryKey FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE OBJECTPROPERTY(OBJECT_ID(constraint_name), 'IsPrimaryKey') = 1 AND table_name = {tablename} order by ordinal_position`,

	getTableFieldNames: `select column_name as fieldname from information_schema.columns where table_name = '{tablename}'`,
	isTableExists: `SELECT * FROM sysobjects WHERE name= '{tablename}'`,
};

module.exports = me;
