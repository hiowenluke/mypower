
const fs = require('fs');

const my = require('../../src');
const expect = require('chai').expect;

const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, it___________________________} = tools;

describe('MySQL - manager', () => {
	const databaseName = config.testOptions.database;
	const userTableName = config.testOptions.userTableName;

	const testDatabaseName = databaseName + '_xxx';

	prepareForTesting();
	it___________________________();

	it(`.cloneDatabase()`, async () => {
		const sourceDatabase = databaseName;
		const targetDatabase = testDatabaseName;

		await my.dropDatabase(targetDatabase);
		await my.cloneDatabase(sourceDatabase, targetDatabase);

		await my.useDatabase(targetDatabase);
		const result = await my.select(userTableName);

		await my.dropDatabase(targetDatabase);
		expect(result.length > 0).to.be.true;
	});

	it(`.cloneDatabaseStructure()`, async () => {
		const sourceDatabase = databaseName;
		const targetDatabase = testDatabaseName;

		await my.dropDatabase(targetDatabase);
		await my.cloneDatabaseStructure(sourceDatabase, targetDatabase);

		await my.useDatabase(targetDatabase);
		const result = await my.select(userTableName);

		await my.dropDatabase(targetDatabase);
		expect(result.length === 0).to.be.true;
	});

	it(`.renameDatabase()`, async () => {
		const oldDatabaseName = databaseName;
		const newDatabaseName = oldDatabaseName + '_new';

		await my.dropDatabase(newDatabaseName);
		await my.renameDatabase(oldDatabaseName, newDatabaseName);

		const result = await my.isDatabaseExists(newDatabaseName);

		await my.renameDatabase(newDatabaseName, oldDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.backupDatabase(databaseName, outfile)`, async () => {
		const outfile = './' + databaseName + '.sql';
		const result = await my.backupDatabase(databaseName, outfile);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile)`, async () => {

		// Delete the test database before restore
		await my.dropDatabase(testDatabaseName);

		const infile = './' + databaseName + '.sql';
		await my.restoreDatabase(testDatabaseName, infile);

		const result = await my.isTableExists(userTableName, testDatabaseName);

		result && fs.unlinkSync(infile);
		expect(result === true).to.be.true;
	});

	it(`.backupDatabase(databaseName, outfile) // for .gz`, async () => {
		const outfile = './' + databaseName + '.sql.gz';
		const result = await my.backupDatabase(databaseName, outfile);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile) // for .gz`, async () => {

		// Delete the test database before restore
		await my.dropDatabase(testDatabaseName);

		const infile = './' + databaseName + '.sql.gz';
		await my.restoreDatabase(testDatabaseName, infile);

		const result = await my.isTableExists(userTableName, testDatabaseName);

		result && fs.unlinkSync(infile);
		expect(result === true).to.be.true;
	});

	it(`.backupAllDatabases()`, async () => {
		const outfile = './all.sql';
		const result = await my.backupAllDatabases(outfile);
		expect(result === true).to.be.true;
	});

	it(`.restoreAllDatabases()`, async () => {

		// Delete the test database before restore
		await my.dropDatabase(testDatabaseName);

		const infile = './all.sql';
		await my.restoreAllDatabases(infile);

		const result = await my.isTableExists(userTableName, testDatabaseName);

		result && fs.unlinkSync(infile);
		expect(result === true).to.be.true;
	});

});
