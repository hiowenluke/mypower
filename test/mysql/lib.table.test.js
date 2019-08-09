
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');

describe('MySQL - lib.table', () => {
	const databaseName = 'test_db_123';
	const tableName = 'users';

	it('init nodber', async () => {
		nodber.init(config.use('mysql'));

		await nodber.createDatabase(databaseName);
		await nodber.useDatabase(databaseName);
		await nodber.dropTable(tableName);
	});

	it(`.createTable() // true`, async () => {
		const fields = [
			{name: 'id', type: 'autoId'},
			{name: 'username', type: 'string', length: 100, notNull: false, isPrimaryKey: true},
			{name: 'password', type: 'string', length: 100},
		];

		const result = await nodber.createTable(tableName, fields);
		expect(result === true).to.be.true;
	});

	it(`.isTableExists() // true`, async () => {
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

	// it(`.dropTable() // true`, async () => {
	// 	const result = await nodber.dropTable(tableName);
	// 	expect(result === true).to.be.true;
	// });

});
