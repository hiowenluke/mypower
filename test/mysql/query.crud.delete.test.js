
const my = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - query/crud/delete', () => {
	const table = 'users';

	my.init(config);
	prepareForTesting();

	it(`.delete(table, where) // where = 'id=5'`, async () => {
		const result = await my.delete(table);
		expect(result === true).to.be.true;
	});

	it(`.delete(table, where) // where = {id: 4}`, async () => {
		const result = await my.delete(table);
		expect(result === true).to.be.true;
	});


});
