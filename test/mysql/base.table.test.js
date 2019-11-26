
const my = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - base/table', () => {
	const databaseName = config.testOptions.database;
	const tableName = 'users_xxx';

	prepareForTesting();
	_________________();

	it(`.createTable()`, async () => {
		await my.dropTable(tableName);
		const result = await tools.createTableUsers(tableName);
		expect(result === true).to.be.true;
	});

	it(`.isTableExists()`, async () => {
		const result = await my.isTableExists(tableName);
		expect(result === true).to.be.true;
	});

	it(`.showTables() // find the tableName in result array`, async () => {
		const result = await my.showTables(tableName);
		expect(!!result.find(item => item['Tables_in_' + databaseName] === tableName)).to.be.true;
	});

	it(`.descTable()`, async () => {
		const result = await my.descTable(tableName);
		expect(result[0].Field === 'id').to.be.true;
	});

	it(`.isEmptyTable() // false`, async () => {
		await my.exec(`insert into ${tableName} (id, username) values(1, 'haha')`);
		const result = await my.isEmptyTable(tableName);
		expect(result === false).to.be.true;
	});

	it(`.truncateTable()`, async () => {
		const result = await my.truncateTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.isEmptyTable()`, async () => {
		const result = await my.isEmptyTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.renameTable()`, async () => {
		const a = tableName;
		const b = tableName + '_123';
		await my.renameTable(a, b);
		const result = await my.renameTable(b, a);
		expect(result === true).to.be.true;
	});

	it(`.moveTable() // keep table name`, async () => {
		const from = databaseName;
		const to = 'sys';
		await my.moveTable(from, to, tableName);
		const result = await my.moveTable(to, from, tableName);
		expect(result === true).to.be.true;
	});

	it(`.moveTable() // rename table`, async () => {
		const fromDatabase = databaseName;
		const fromTable = tableName;
		const toDatabase = 'sys';
		const toTable = fromTable + '_123';
		await my.moveTable(fromDatabase, toDatabase, fromTable, toTable);
		const result = await my.moveTable(toDatabase, fromDatabase, toTable, fromTable);
		expect(result === true).to.be.true;
	});

	it(`.dropTable()`, async () => {
		const result = await my.dropTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.cloneTableStructure()`, async () => {
		await tools.createTableUsers(tableName);
		await tools.addUsers(tableName);

		const newTableName = tableName + '_new';
		await my.dropTable(newTableName);
		await my.cloneTableStructure(newTableName, tableName);

		const result = await my.getFieldNames(newTableName);
		await my.dropTable(tableName);

		expect(result.length > 0).to.be.true;
	});

	it(`.cloneTable()`, async () => {
		await tools.createTableUsers(tableName);
		await tools.addUsers(tableName);

		const newTableName = tableName + '_new';
		await my.dropTable(newTableName);
		await my.cloneTable(newTableName, tableName);

		const result = await my.select(newTableName);
		await my.dropTable(tableName);

		expect(result.length > 0).to.be.true;
	});

});
