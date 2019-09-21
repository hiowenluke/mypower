
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

	it(`.switchToServer(config)`, async () => {
		const cfg = config.use('mysql');
		const result = await nodber.switchToServer(cfg);
		expect(result === true).to.be.true;
	});

	it(`.switchToServer(host)`, async () => {
		const cfg = config.use('mysql');
		const host = cfg.host;
		const result = await nodber.switchToServer(host);
		expect(result === true).to.be.true;
	});

	it(`.switchToServer()`, async () => {
		const result = await nodber.switchToServer();
		expect(result === true).to.be.true;
	});

	it(`.connectServer()`, async () => {
		const cfg = config.use('mysql');
		const result = await nodber.connectServer(cfg);
		expect(result === true).to.be.true;
	});
});
