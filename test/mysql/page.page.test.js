
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

	it(`.page({table, fields, order, pageNumber, pageSize})`, async () => {
		const fields = 'username';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.page({table, fields, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7 && Object.keys(result.rows[0]).length === 1).to.be.true;
	});

	it(`.page({table, fields, where, order, pageNumber, pageSize})`, async () => {
		const fields = 'id, username';
		const where = 'id > 2';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.page({table, fields, where, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 5 && Object.keys(result.rows[0]).length === 2).to.be.true;
	});

	it(`.page({table, fields, where, order, pageNumber, pageSize, data})`, async () => {
		const fields = 'id, username';
		const where = 'isaverangers = :isaverangers';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const data = {isaverangers: 1};
		const result = await nodber.page({table, fields, where, order, pageNumber, pageSize, data});
		expect(result.pageSize === 3 && result.count === 6 && Object.keys(result.rows[0]).length === 2).to.be.true;
	});

});
