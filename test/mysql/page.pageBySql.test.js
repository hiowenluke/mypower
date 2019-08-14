
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

	it(`.pageBySql({sql, order, pageNumber, pageSize})`, async () => {
		const sql = 'select * from users';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const result = await nodber.pageBySql({sql, order, pageNumber, pageSize});
		expect(result.pageSize === 3 && result.count === 7).to.be.true;
	});

	it(`.pageBySql({sql, order, pageNumber, pageSize, data})`, async () => {
		const sql = 'select * from users where isaverangers = :isaverangers';
		const order = 'id';
		const pageNumber = 2;
		const pageSize = 3;
		const data = {isaverangers: 1};
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
