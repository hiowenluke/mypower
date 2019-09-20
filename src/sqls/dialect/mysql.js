
// To query the information of the table in mysql, we need to specify the schema name,
// otherwise it will return information in multiple schema (if there is the same table name)

const me = {

	// -------------------------------------------
	// Database (schema)
	// -------------------------------------------

	isDatabaseExists: 'select schema_name as databaseName from information_schema.schemata where schema_name = "{databaseName}"',
	createDatabase: 'create database `{databaseName}` character set utf8mb4 collate utf8mb4_unicode_ci',
	dropDatabase: 'drop database `{databaseName}`',
	useDatabase: 'use `{databaseName}`',
	showDatabases: 'show databases',
	getSelectedDatabase: 'select database() as databaseName',
	renameDatabase: 'rename database `{old_databaseName}` to `{new_databaseName}`',
	setDatabaseCharacter: 'alter database {databaseName} character set {character}',


	// -------------------------------------------
	// Table
	// -------------------------------------------

	isTableExists: 'select table_name as tablename from information_schema.tables where table_name = "{tableName}" and table_schema = "{databaseName}"',
	createTable: 'create table `{tableName}` ({fields}) engine=innodb default charset=utf8mb4 collate utf8mb4_unicode_ci',
	dropTable: 'drop table `{tableName}`',
	truncateTable: 'truncate table `{tableName}`', // clear table quickly, faster than delete from table
	descTable: 'desc `{tableName}`',
	showTables: 'show tables',
	isEmptyTable: 'select * from `{tableName}` limit 0, 1',
	renameTable: 'rename table {old_tableName} to {new_tableName}',
	moveTable: 'rename table {from_databaseName}.`{from_tableName}` to {to_databaseName}.`{to_tableName}`',
	cloneTableStructure: 'create table {new_databaseName}.{new_tableName} like {old_databaseName}.{old_tableName}',
	copyTableData: 'insert into {to_databaseName}.{to_tableName} select * from {from_databaseName}.{from_tableName}',


	// -------------------------------------------
	// Fields
	// -------------------------------------------

	getFieldNames: 'select column_name as fieldname from information_schema.columns where table_name = "{tableName}" and table_schema = "{databaseName}"',
	getAutoIdName: 'select column_name as autoIdName from information_schema.columns where table_schema="{databaseName}" and table_name="{tableName}" and extra = "auto_increment"',
	getFieldsInfo: 'select * from information_schema.columns where table_name = "{tableName}" and table_schema = "{databaseName}"',
	getFieldType: 'select data_type as type, character_maximum_length as length, numeric_precision as m, numeric_scale as d from information_schema.columns where table_schema="{databaseName}" and table_name="{tableName}" and column_name="{fieldName}"',
	addField: 'alter table {tableName} add {fieldName} {fieldTypeStr}',
	deleteField: 'alter table {tableName} drop {fieldName}',
	changeField: 'alter table {tableName} change {old_fieldName} {new_fieldName} {new_fieldTypeStr}',


	// -------------------------------------------
	// Primary Key
	// -------------------------------------------

	// Because there may be multiple primary keys, sort by ordinal_position
	getPrimaryKeys: 'select column_name as primarykey from information_schema.key_column_usage where table_name= "{tableName}" and constraint_schema= "{databaseName}" and constraint_name = "primary" order by ordinal_position',
	addPrimaryKeys: 'alter table {tableName} add primary key({primaryKeys})',


	// -------------------------------------------
	// Records
	// -------------------------------------------

	count: 'select count(*) as cnt from `{tableName}` where {whereStr}',
	getMaxFieldValue: 'select max({fieldName}) as maxval from `{tableName}` where {whereStr}',
	getMinFieldValue: 'select min({fieldName}) as minval from `{tableName}` where {whereStr}',
	getMaxRecord: 'select * from `{tableName}` where {whereStr} and {fieldName} = (select max({fieldName}) from `{tableName}` where {whereStr})',
	getMinRecord: 'select * from `{tableName}` where {whereStr} and {fieldName} = (select min({fieldName}) from `{tableName}` where {whereStr})',

	// -------------------------------------------
	// System
	// -------------------------------------------
	getWarningCount: 'select @@warning_count as warningCount',
	getVersion: 'select version() as version',
	getSystemVariables: 'show variables {variableName}',

};

module.exports = me;
