
const nodber = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');

describe('MySQL - main/goto', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();
	tools.breakLine();

	it(`.previous(table, idValue)`, async () => {
		const idValue = 3;
		const result = await nodber.previous(table, idValue);
		expect(result.id === 2).to.be.true;
	});

	it(`.previous(table, idName, idValue)`, async () => {
		const idName = 'id';
		const idValue = 3;
		const result = await nodber.previous(table, idName, idValue);
		expect(result.id === 2).to.be.true;
	});

});

