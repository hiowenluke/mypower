
const my = require('../../src');
const expect = require('chai').expect;

const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

const simulateServerConfig = () => {
	const serverConfig = config;
	serverConfig.host = 'localhost';
	return serverConfig;
};

describe('MySQL - base/database', () => {
	const databaseName = config.testOptions.database;
	const testDatabaseName = databaseName + '_xxx';

	my.init(config);
	prepareForTesting();

	it(`.createDatabase(databaseName)`, async () => {
		await my.dropDatabase(testDatabaseName);
		const result = await my.createDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.createDatabase(databaseName, host)`, async () => {
		const host = 'localhost';
		await my.dropDatabase(testDatabaseName, host);

		const result = await my.createDatabase(testDatabaseName, host);
		expect(result === true).to.be.true;
	});

	it(`.createDatabase(databaseName, serverConfig)`, async () => {
		const serverConfig = simulateServerConfig();
		await my.dropDatabase(testDatabaseName, serverConfig);

		const result = await my.createDatabase(testDatabaseName, serverConfig);
		expect(result === true).to.be.true;
	});

	it(`.isDatabaseExists(databaseName)`, async () => {
		const result = await my.isDatabaseExists(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.isDatabaseExists(databaseName, host)`, async () => {
		const host = 'localhost';
		const result = await my.isDatabaseExists('sys', host);
		expect(result === true).to.be.true;
	});

	it(`.isDatabaseExists(databaseName, serverConfig)`, async () => {
		const serverConfig = simulateServerConfig();
		const result = await my.isDatabaseExists(testDatabaseName, serverConfig);
		expect(result === true).to.be.true;
	});

	it(`.showDatabases() // find the testDatabaseName in result array`, async () => {
		const result = await my.showDatabases();
		expect(result.indexOf(testDatabaseName) >= 0).to.be.true;
	});

	it(`.useDatabase() and .getSelectedDatabase()`, async () => {
		await my.useDatabase('sys');
		await my.useDatabase(testDatabaseName);
		const result = await my.getSelectedDatabase();
		expect(result === testDatabaseName).to.be.true;
	});

	it(`.dropDatabase() or .deleteDatabase()`, async () => {
		const result = await my.dropDatabase(testDatabaseName);
		// const result = await my.deleteDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

});
