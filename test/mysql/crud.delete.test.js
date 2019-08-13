
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

describe('MySQL - crud/delete', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();

	// ----------------------------------------------
	tools.breakLine();

	it(`.delete(table, where) // where = 'id=5'`, async () => {
		const result = await nodber.delete(table);
		expect(result === true).to.be.true;
	});

	it(`.delete(table, where) // where = {id: 4}`, async () => {
		const result = await nodber.delete(table);
		expect(result === true).to.be.true;
	});


});
