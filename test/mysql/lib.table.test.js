
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

describe('MySQL - lib/table', () => {
	const databaseName = config.testOptions.database;
	const tableName = 'users';

	tools.init(databaseName, tableName);
	tools.initTableUser();

	it(`.isTableExists()`, async () => {
		const result = await nodber.isTableExists(tableName);
		expect(result === true).to.be.true;
	});

	it(`.createTable() // false, 'cause it is exists`, async () => {
		const result = await nodber.createTable(tableName);
		expect(result === false).to.be.true;
	});

	it(`.showTables() // find the tablename in result array`, async () => {
		const result = await nodber.showTables(tableName);
		expect(!!result.find(item => item['Tables_in_' + databaseName] === tableName)).to.be.true;
	});

	it(`.descTable()`, async () => {
		const result = await nodber.descTable(tableName);
		expect(result[0].Field === 'id').to.be.true;
	});

	it(`.isEmptyTable() // false`, async () => {
		await nodber.exec(`insert into users (id, username) values(1, 'haha')`);
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

	it(`.moveTable()`, async () => {
		const from = databaseName;
		const to = 'sys';
		await nodber.moveTable(from, to, tableName);
		const result = await nodber.moveTable(to, from, tableName);
		expect(result === true).to.be.true;
	});

	it(`.dropTable()`, async () => {
		const result = await nodber.dropTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.getTableNameFromSql() // for select `, async () => {
		const result = nodber.getTableNameFromSql(`select * from users`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for insert `, async () => {
		const result = nodber.getTableNameFromSql(`insert into users (id, username) values(1, 'haha')`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for update `, async () => {
		const result = nodber.getTableNameFromSql(`update users set username = 'owen' where id = 1`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for delete `, async () => {
		const result = nodber.getTableNameFromSql(`delete from users where 1 = 0`);
		expect(result === 'users').to.be.true;
	});

});
