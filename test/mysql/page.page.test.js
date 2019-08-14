
const nodber = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');

describe('MySQL - page/page', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();

	// ----------------------------------------------
	tools.breakLine();

	it(`.page({table, pageNumber, pageSize})`, async () => {
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.page({table, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

	it(`.page({table, order, pageNumber, pageSize})`, async () => {
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.page({table, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

});
