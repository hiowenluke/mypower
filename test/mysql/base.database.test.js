
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - base/database', () => {
	const databaseName = config.testOptions.database;
	const userTableName = config.testOptions.userTableName;

	const testDatabaseName = databaseName + '_xxx';

	itInit();
	it___________________________();

	it(`.createDatabase()`, async () => {
		await nodber.dropDatabase(testDatabaseName);
		const result = await nodber.createDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.isDatabaseExists()`, async () => {
		const result = await nodber.isDatabaseExists(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.createDatabase() // false, 'cause it is exists`, async () => {
		const result = await nodber.createDatabase(testDatabaseName);
		expect(result === false).to.be.true;
	});

	it(`.showDatabases() // find the testDatabaseName in result array`, async () => {
		const result = await nodber.showDatabases(testDatabaseName);
		expect(!!result.find(item => item.Database === testDatabaseName)).to.be.true;
	});

	it(`.useDatabase() and .getSelectedDatabase()`, async () => {
		await nodber.useDatabase('sys');
		await nodber.useDatabase(testDatabaseName);
		const result = await nodber.getSelectedDatabase();
		expect(result === testDatabaseName).to.be.true;
	});

	it(`.dropDatabase()`, async () => {
		const result = await nodber.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.cloneDatabase()`, async () => {
		const sourceDatabase = databaseName;
		const targetDatabase = testDatabaseName;

		await nodber.dropDatabase(targetDatabase);
		await nodber.cloneDatabase(sourceDatabase, targetDatabase);

		await nodber.useDatabase(targetDatabase);
		const result = await nodber.select(userTableName);

		await nodber.dropDatabase(targetDatabase);
		expect(result.length > 0).to.be.true;
	});

	it(`.cloneDatabaseStructure()`, async () => {
		const sourceDatabase = databaseName;
		const targetDatabase = testDatabaseName;

		await nodber.dropDatabase(targetDatabase);
		await nodber.cloneDatabaseStructure(sourceDatabase, targetDatabase);

		await nodber.useDatabase(targetDatabase);
		const result = await nodber.select(userTableName);

		await nodber.dropDatabase(targetDatabase);
		expect(result.length === 0).to.be.true;
	});

	it(`.renameDatabase()`, async () => {
		const oldDatabaseName = databaseName;
		const newDatabaseName = oldDatabaseName + '_new';

		await nodber.dropDatabase(newDatabaseName);
		await nodber.renameDatabase(oldDatabaseName, newDatabaseName);

		const result = await nodber.isDatabaseExists(newDatabaseName);

		await nodber.renameDatabase(newDatabaseName, oldDatabaseName);
		expect(result === true).to.be.true;
	});

});
