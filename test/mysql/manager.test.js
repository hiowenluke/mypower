
const fs = require('fs');

const my = require('../../src');
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
		const outfile = './' + testDatabaseName + '.sql';
		const result = await my.backupDatabase(databaseName, outfile);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile)`, async () => {
		const infile = './' + testDatabaseName + '.sql';
		await my.restoreDatabase(testDatabaseName, infile);

		const result = await my.isDatabaseExists(testDatabaseName);

		fs.unlinkSync(infile);
		await my.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.backupDatabase(databaseName, outfile) // for xxx.sql.gz`, async () => {
		const outfile = './' + testDatabaseName + '.sql.gz';
		const result = await my.backupDatabase(databaseName, outfile);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile) // for xxx.sql.gz`, async () => {
		const infile = './' + testDatabaseName + '.sql.gz';
		await my.restoreDatabase(testDatabaseName, infile);

		const result = await my.isDatabaseExists(testDatabaseName);

		fs.unlinkSync(infile);
		await my.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.backupDatabase(databaseName, outfile, options) // options = {zip: true}`, async () => {
		const outfile = './' + testDatabaseName + '.xxx';
		const options = {zip: true};
		const result = await my.backupDatabase(databaseName, outfile, options);
		expect(result === true).to.be.true;
	});

	it(`.restoreDatabase(databaseName, infile, options) // options = {unzip: true}`, async () => {
		const infile = './' + testDatabaseName + '.xxx';
		const options = {unzip: true};
		await my.restoreDatabase(testDatabaseName, infile, options);

		const result = await my.isDatabaseExists(testDatabaseName);

		fs.unlinkSync(infile);
		await my.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.backupAllDatabases()`, async () => {

		// Create the test database before backup
		await my.createDatabase(testDatabaseName);

		const outfile = './all.sql';
		const result = await my.backupAllDatabases(outfile);

		// Delete the test database after backed up
		await my.dropDatabase(testDatabaseName);
		expect(result === true).to.be.true;
	});

	it(`.restoreAllDatabases()`, async () => {
		const infile = './all.sql';
		await my.restoreAllDatabases(infile);

		// The test database should be exists after restored
		const result = await my.isDatabaseExists(testDatabaseName);

		// Delete it after tested
		await my.dropDatabase(testDatabaseName);
		fs.unlinkSync(infile);

		expect(result === true).to.be.true;
	});

});
