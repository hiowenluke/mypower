
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

describe('MySQL - base/database', () => {
	const databaseName = config.testOptions.database;

	tools.initNodber();

	it('// init', async () => {
		await nodber.dropDatabase(databaseName);
	});

	tools.breakLine();

	it(`.createDatabase()`, async () => {
		const result = await nodber.createDatabase(databaseName);
		expect(result === true).to.be.true;
	});

	it(`.isDatabaseExists()`, async () => {
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

	it(`.useDatabase() and .getSelectedDatabase()`, async () => {
		await nodber.useDatabase('sys');
		await nodber.useDatabase(databaseName);
		const result = await nodber.getSelectedDatabase();
		expect(result === databaseName).to.be.true;
	});

	it(`.renameDatabase()`, async () => {
		const oldName = databaseName;
		const newName = oldName + '_xxx';
		await nodber.renameDatabase(oldName, newName);

		const result = await nodber.isDatabaseExists(newName);
		expect(result === true).to.be.true;
	});

	it(`.dropDatabase()`, async () => {
		const result = await nodber.dropDatabase(databaseName);
		expect(result === true).to.be.true;
	});
});
