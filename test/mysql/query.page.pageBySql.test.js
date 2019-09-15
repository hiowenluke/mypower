
const nodber = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - query/page/pageBySql', () => {
	const table = 'users';

	itInit();
	it___________________________();

	it(`.pageBySql({sql, order, pageNumber, pageSize})`, async () => {
		const sql = 'select * from users';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.pageBySql({sql, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

	it(`.pageBySql({sql, order, pageNumber, pageSize, data})`, async () => {
		const sql = 'select * from users where isAvenger = :isAvenger';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const data = {isAvenger: 1};
		const result = await nodber.pageBySql({sql, order, pageNumber, pageSize, data});
		expect(result.pageSize === 3 && result.count === 6).to.be.true;
	});

	it(`.pageBySql({sql, pageNumber, pageSize})`, async () => {
		const sql = 'select * from users';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.pageBySql({sql, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

});
