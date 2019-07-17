
const me = {

	// Because there may be multiple primary keys, sort by ordinal_position
	getPrimaryKeys: `SELECT column_name as primaryKey FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE table_name={tablename} AND CONSTRAINT_SCHEMA={database} AND constraint_name='PRIMARY' order by ordinal_position`,
};

module.exports = me;
