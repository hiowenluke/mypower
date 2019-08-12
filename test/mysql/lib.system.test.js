
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');

describe('MySQL - lib/system', () => {

	it('init nodber', async () => {
		nodber.init(config.use('mysql'));
	});

	it(`.getSystemVariable()`, async () => {
		const result = await nodber.getSystemVariable('version');
		expect(typeof result === 'string').to.be.true;
	});

	it(`.getSystemVariables()`, async () => {
		const result = await nodber.getSystemVariables();
		expect(Array.isArray(result)).to.be.true;
	});

	it(`.getVersion()`, async () => {
		const result = await nodber.getVersion();
		expect(typeof result === 'string').to.be.true;
	});

	it(`.getWarningCount()`, async () => {
		const result = await nodber.getWarningCount();
		expect(typeof result === 'number').to.be.true;
	});

	it(`.isSuccessful()`, async () => {
		const result = await nodber.isSuccessful();
		expect(typeof result === 'boolean').to.be.true;
	});

});
