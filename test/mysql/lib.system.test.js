
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');

describe('MySQL - lib.table', () => {

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

});
