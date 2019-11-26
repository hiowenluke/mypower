
const my = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - base/system', () => {

	my.init(config);
	prepareForTesting();
	_________________();

	it(`.getSystemVariable()`, async () => {
		const result = await my.getSystemVariable('version');
		expect(typeof result === 'string').to.be.true;
	});

	it(`.getSystemVariables()`, async () => {
		const result = await my.getSystemVariables();
		expect(Array.isArray(result)).to.be.true;
	});

	it(`.getVersion()`, async () => {
		const result = await my.getVersion();
		expect(typeof result === 'string').to.be.true;
	});

	it(`.getWarningCount()`, async () => {
		const result = await my.getWarningCount();
		expect(typeof result === 'number').to.be.true;
	});

	it(`.isSuccessful()`, async () => {
		const result = await my.isSuccessful();
		expect(typeof result === 'boolean').to.be.true;
	});

});
