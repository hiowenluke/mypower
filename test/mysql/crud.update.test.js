
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

describe('MySQL - crud/update', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();

	// ----------------------------------------------
	tools.breakLine();

	it(`.update(table, data, where) // data = {username: 'haha'}, where = 'id = 1'`, async () => {
		const data = {username: 'haha'};
		const where = 'id = 1';
		const result = await nodber.update(table, data, where);
		expect(result === 1).to.be.true;
	});

	it(`.update(table, data, where) // data = {username: 'haha'}, where = 'id = 1'`, async () => {
		const data = {username: 'haha'};
		const where = 'id = 1';
		const result = await nodber.update(table, data, where);

		// The result will be 0, 'cause we do the same for the same record twice
		expect(result === 0).to.be.true;
	});

	it(`.update(table, data, where) // data = {username: 'haha'}, where = {id: 2}`, async () => {
		const data = {username: 'haha'};
		const where = {id: 2};
		const result = await nodber.update(table, data, where);
		expect(result === 1).to.be.true;
	});

	it(`.update(table, data) // data = {username: 'haha'}`, async () => {
		const data = {username: 'haha'};
		const result = await nodber.update(table, data);
		expect(result === 5).to.be.true;
	});

});
