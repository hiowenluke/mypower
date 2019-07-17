
// To query the information of the table in mysql, we need to specify the schema name,
// otherwise it will return information in multiple schema (if there is the same table name)

const me = {

	// Because there may be multiple primary keys, sort by ordinal_position
	getPrimaryKeys: `SELECT column_name as primaryKey FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE table_name= '{tablename}' AND CONSTRAINT_SCHEMA= '{database}' AND constraint_name='PRIMARY' order by ordinal_position`,

	getTableFieldNames: `select COLUMN_NAME as fieldname from information_schema.COLUMNS where table_name = '{tablename}' and table_schema = '{database}'`,
	isTableExists: `SELECT table_name FROM information_schema.TABLES WHERE table_name ='{tablename}' and table_schema = '{database}'`,
};

module.exports = me;
