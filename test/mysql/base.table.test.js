
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - base/table', () => {
	const databaseName = config.testOptions.database;
	const tableName = 'users_xxx';

	itInit();
	it___________________________();

	it(`.createTable()`, async () => {
		await nodber.dropTable(tableName);
		const result = await tools.createTableUsers(tableName);
		expect(result === true).to.be.true;
	});

	it(`.isTableExists()`, async () => {
		const result = await nodber.isTableExists(tableName);
		expect(result === true).to.be.true;
	});

	it(`.showTables() // find the tableName in result array`, async () => {
		const result = await nodber.showTables(tableName);
		expect(!!result.find(item => item['Tables_in_' + databaseName] === tableName)).to.be.true;
	});

	it(`.descTable()`, async () => {
		const result = await nodber.descTable(tableName);
		expect(result[0].Field === 'id').to.be.true;
	});

	it(`.isEmptyTable() // false`, async () => {
		await nodber.exec(`insert into ${tableName} (id, username) values(1, 'haha')`);
		const result = await nodber.isEmptyTable(tableName);
		expect(result === false).to.be.true;
	});

	it(`.truncateTable() and .isEmptyTable() // true`, async () => {
		await nodber.truncateTable(tableName);
		const result = await nodber.isEmptyTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.renameTable()`, async () => {
		const a = tableName;
		const b = tableName + '_123';
		await nodber.renameTable(a, b);
		const result = await nodber.renameTable(b, a);
		expect(result === true).to.be.true;
	});

	it(`.moveTable() // keep table name`, async () => {
		const from = databaseName;
		const to = 'sys';
		await nodber.moveTable(from, to, tableName);
		const result = await nodber.moveTable(to, from, tableName);
		expect(result === true).to.be.true;
	});

	it(`.moveTable() // rename table`, async () => {
		const fromDatabase = databaseName;
		const fromTable = tableName;
		const toDatabase = 'sys';
		const toTable = fromTable + '_123';
		await nodber.moveTable(fromDatabase, toDatabase, fromTable, toTable);
		const result = await nodber.moveTable(toDatabase, fromDatabase, toTable, fromTable);
		expect(result === true).to.be.true;
	});

	it(`.dropTable()`, async () => {
		const result = await nodber.dropTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.cloneTableStructure()`, async () => {
		await tools.createTableUsers(tableName);
		await tools.addUsers(tableName);

		const newTableName = tableName + '_new';
		await nodber.dropTable(newTableName);
		await nodber.cloneTableStructure(newTableName, tableName);

		const result = await nodber.getFieldNames(newTableName);
		await nodber.dropTable(tableName);

		expect(result.length > 0).to.be.true;
	});

	it(`.cloneTable()`, async () => {
		await tools.createTableUsers(tableName);
		await tools.addUsers(tableName);

		const newTableName = tableName + '_new';
		await nodber.dropTable(newTableName);
		await nodber.cloneTable(newTableName, tableName);

		const result = await nodber.select(newTableName);
		await nodber.dropTable(tableName);

		expect(result.length > 0).to.be.true;
	});

});
