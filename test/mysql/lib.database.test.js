
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');

describe('MySQL - lib.database', () => {
	const databaseName = 'test_db_123';

	it('init nodber', async () => {
		nodber.init(config.use('mysql'));
		await nodber.dropDatabase(databaseName);
	});

	it(`.createDatabase() // true`, async () => {
		const result = await nodber.createDatabase(databaseName);
		expect(result === true).to.be.true;
	});

	it(`.isDatabaseExists() // true`, async () => {
		const result = await nodber.isDatabaseExists(databaseName);
		expect(result === true).to.be.true;
	});

	it(`.createDatabase() // false, 'cause it is exists`, async () => {
		const result = await nodber.createDatabase(databaseName);
		expect(result === false).to.be.true;
	});

	it(`.showDatabases() // find the databaseName in result array`, async () => {
		const result = await nodber.showDatabases(databaseName);
		expect(!!result.find(item => item.Database === databaseName)).to.be.true;
	});

	it(`.useDatabase() and .getSelectedDatabase() // true`, async () => {
		await nodber.useDatabase('sys');
		await nodber.useDatabase(databaseName);
		const result = await nodber.getSelectedDatabase();
		expect(result === databaseName).to.be.true;
	});

	it(`.dropDatabase() // true`, async () => {
		const result = await nodber.dropDatabase(databaseName);
		expect(result === true).to.be.true;
	});

});
