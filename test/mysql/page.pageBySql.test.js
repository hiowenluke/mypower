
const nodber = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');

describe('MySQL - page/pageBySql', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();

	// ----------------------------------------------
	tools.breakLine();

	it(`.pageBySql(sqlStr, {order, pageNumber, pageSize})`, async () => {
		const sqlStr = 'select * from users';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.pageBySql(sqlStr, {order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

	it(`.pageBySql(sqlStr, {pageNumber, pageSize})`, async () => {
		const sqlStr = 'select * from users';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.pageBySql(sqlStr, {pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

});
