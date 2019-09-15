
const fs = require('fs');

const nodber = require('../../src');
const expect = require('chai').expect;

const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - manager', () => {
	const databaseName = config.testOptions.database;
	const userTableName = config.testOptions.userTableName;

	const testDatabaseName = databaseName + '_xxx';

	itInit();
	it___________________________();

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

	it(`.backupDatabase(databaseName, outfile)`, async () => {
		const outfile = './' + testDatabaseName + '.sql';
		const result = await nodber.backupDatabase(databaseName, outfile);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile)`, async () => {
		const infile = './' + testDatabaseName + '.sql';
		await nodber.restoreDatabase(testDatabaseName, infile);

		const result = await nodber.isDatabaseExists(testDatabaseName);

		fs.unlinkSync(infile);
		await nodber.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.backupDatabase(databaseName, outfile) // for xxx.sql.gz`, async () => {
		const outfile = './' + testDatabaseName + '.sql.gz';
		const result = await nodber.backupDatabase(databaseName, outfile);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile) // for xxx.sql.gz`, async () => {
		const infile = './' + testDatabaseName + '.sql.gz';
		await nodber.restoreDatabase(testDatabaseName, infile);

		const result = await nodber.isDatabaseExists(testDatabaseName);

		fs.unlinkSync(infile);
		await nodber.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.backupDatabase(databaseName, outfile, options) // options = {zip: true}`, async () => {
		const outfile = './' + testDatabaseName + '.xxx';
		const options = {zip: true};
		const result = await nodber.backupDatabase(databaseName, outfile, options);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile, options) // options = {unzip: true}`, async () => {
		const infile = './' + testDatabaseName + '.xxx';
		const options = {unzip: true};
		await nodber.restoreDatabase(testDatabaseName, infile, options);

		const result = await nodber.isDatabaseExists(testDatabaseName);

		fs.unlinkSync(infile);
		await nodber.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.backupAllDatabases()`, async () => {

		// Create the test database before backup
		await nodber.createDatabase(testDatabaseName);

		const outfile = './all.sql';
		const result = await nodber.backupAllDatabases(outfile);

		// Delete the test database after backed up
		await nodber.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.restoreAllDatabases()`, async () => {
		const infile = './all.sql';
		await nodber.restoreAllDatabases(infile);

		// The test database should be exists after restored
		const result = await nodber.isDatabaseExists(testDatabaseName);

		// Delete it after tested
		await nodber.dropDatabase(testDatabaseName);
		fs.unlinkSync(infile);

		expect(result === true).to.be.true;
	});

});
