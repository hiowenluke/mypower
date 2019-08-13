
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

describe('MySQL - crud/insert', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();

	// ----------------------------------------------
	tools.breakLine();

	it(`.insert(table, data) // data = {username: 'haha'}`, async () => {
		const data = {username: 'haha'};
		const result = await nodber.insert(table, data);
		expect(typeof result === "number").to.be.true;
	});

});
