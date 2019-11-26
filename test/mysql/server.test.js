
const my = require('../../src');
const expect = require('chai').expect;

const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, it___________________________} = tools;

describe('MySQL - server', () => {
	const databaseName = config.testOptions.database;
	const testDatabaseName = databaseName + '_xxx';

	prepareForTesting();
	it___________________________();

	it(`.switchToServer(config)`, async () => {
		const cfg = config;
		const result = await my.switchToServer(cfg);
		expect(result === true).to.be.true;
	});

	it(`.switchToServer(host)`, async () => {
		const cfg = config;
		const host = cfg.host;
		const result = await my.switchToServer(host);
		expect(result === true).to.be.true;
	});

	it(`.switchToServer()`, async () => {
		const result = await my.switchToServer();
		expect(result === true).to.be.true;
	});

	it(`.connectServer()`, async () => {
		const cfg = config;
		const result = await my.connectServer(cfg);
		expect(result === true).to.be.true;
	});

	it(`.isServerOnline()`, async () => {
		const cfg = config;
		const result = await my.isServerOnline(cfg);
		expect(result === true).to.be.true;
	});
});
