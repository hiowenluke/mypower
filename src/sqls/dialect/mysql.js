
// To query the information of the table in mysql, we need to specify the schema name,
// otherwise it will return information in multiple schema (if there is the same table name)

const me = {

	// -------------------------------------------
	// Database (schema)
	// -------------------------------------------

	isDatabaseExists: `select schema_name as databasename from information_schema.schemata where schema_name = '{database}'`,
	createDatabase: `create database {database} character set gbk`,
	dropDatabase: `drop database {database}`,
	useDatabase: `use {database}`,
	showDatabases: `show databases`,
	getSelectedDatabase: `select database() as databasename`,


	// -------------------------------------------
	// Table
	// -------------------------------------------

	isTableExists: `select table_name as tablename from information_schema.tables where table_name ='{table}' and table_schema = '{database}'`,
	createTable: `create table {table} ({fields}) {options}`,
	dropTable: `drop table {table}`,
	truncateTable: `truncate table {table}`, // clear table quickly, faster than delete from table
	descTable: `desc {table}`,
	showTables: `show tables`,

	// -------------------------------------------
	// Fields
	// -------------------------------------------

	// Because there may be multiple primary keys, sort by ordinal_position
	getPrimaryKeys: `select column_name as primarykey from information_schema.key_column_usage where table_name= '{table}' and constraint_schema= '{database}' and constraint_name='primary' order by ordinal_position`,
	getFieldNames: `select column_name as fieldname from information_schema.columns where table_name = '{table}' and table_schema = '{database}'`,


	// -------------------------------------------
	// System
	// -------------------------------------------
	getWarningCount: `select @@warning_count as count`,

};

module.exports = me;
