
const expect = require('chai').expect;

const my = require('../../src');
const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - query/crud/delete', () => {
	const table = 'users';

	my.init(config);
	prepareForTesting();

	it(`.delete(table, where) // where = 'id=100'`, async () => {
		const where = 'id=100';
		const result = await my.delete(table, where);
		expect(result === false).to.be.true;
	});

	it(`.delete(table, where) // where = 'id=5'`, async () => {
		const where = 'id=5';
		const result = await my.delete(table, where);
		expect(result === true).to.be.true;
	});

	it(`.delete(table, where) // where = {id: 4}`, async () => {
		const where = {id: 4};
		const result = await my.delete(table, where);
		expect(result === true).to.be.true;
	});

});
