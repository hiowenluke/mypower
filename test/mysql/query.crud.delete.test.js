
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - query/crud/delete', () => {
	const table = 'users';

	itInit();
	it___________________________();

	it(`.delete(table, where) // where = 'id=5'`, async () => {
		const result = await nodber.delete(table);
		expect(result === true).to.be.true;
	});

	it(`.delete(table, where) // where = {id: 4}`, async () => {
		const result = await nodber.delete(table);
		expect(result === true).to.be.true;
	});


});
