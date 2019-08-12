
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

describe('MySQL - lib/records', () => {
	const databaseName = config.testOptions.database;
	const tableName = 'users';

	tools.initDatabase();
	tools.createTableUser();

	it(`.isRecordExists()`, async () => {
		await nodber.exec(`insert into users (id, username) values(1, 'haha')`);

		const result = await nodber.isRecordExists(tableName);
		expect(result === true).to.be.true;
	});

	it(`.recordsCount()`, async () => {
		const result = await nodber.recordsCount(tableName);
		expect(result === 1).to.be.true;
	});

});
