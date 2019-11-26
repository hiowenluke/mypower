
const my = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - query/page/page', () => {
	const table = 'users';

	my.init(config);
	prepareForTesting();

	it(`.page({table, pageNumber, pageSize})`, async () => {
		const pageNumber = 2;
		const pageSize = 3;
		const result = await my.page({table, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

	it(`.page({table, order, pageNumber, pageSize})`, async () => {
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await my.page({table, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

	it(`.page({table, fields, order, pageNumber, pageSize})`, async () => {
		const fields = 'username';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await my.page({table, fields, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7 && Object.keys(result.rows[0]).length === 1).to.be.true;
	});

	it(`.page({table, fields, where, order, pageNumber, pageSize})`, async () => {
		const fields = 'id, username';
		const where = 'id > 2';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await my.page({table, fields, where, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 5 && Object.keys(result.rows[0]).length === 2).to.be.true;
	});

	it(`.page({table, fields, where, order, pageNumber, pageSize, data})`, async () => {
		const fields = 'id, username';
		const where = 'isAvenger = :isAvenger';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const data = {isAvenger: 1};
		const result = await my.page({table, fields, where, order, pageNumber, pageSize, data});
		expect(result.pageSize === 3 && result.count === 6 && Object.keys(result.rows[0]).length === 2).to.be.true;
	});

});
