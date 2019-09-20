
const nodber = require('../../src');
const expect = require('chai').expect;

const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - server', () => {
	const databaseName = config.testOptions.database;
	const testDatabaseName = databaseName + '_xxx';

	itInit();
	it___________________________();

	it(`.changeServer(config)`, async () => {
		const cfg = config.use('mysql');
		const result = await nodber.changeServer(cfg);
		expect(result === true).to.be.true;
	});

	it(`.changeServer()`, async () => {
		const result = await nodber.changeServer();
		expect(result === true).to.be.true;
	});

	it(`.connectServer()`, async () => {
		const cfg = config.use('mysql');
		const result = await nodber.connectServer(cfg);
		expect(result === true).to.be.true;
	});
});
