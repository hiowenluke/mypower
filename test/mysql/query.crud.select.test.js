
const my = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, it___________________________} = tools;

describe('MySQL - query/crud/select', () => {
	const table = 'users';

	prepareForTesting();
	it___________________________();

	it(`.select(table)`, async () => {
		const result = await my.select(table);
		expect(result.length === 7).to.be.true;
	});

	it(`.select(table, where) // where = "username like 'th%'"`, async () => {
		const where = "username like 'th%'";
		const result = await my.select(table, where);
		expect(result.length === 2).to.be.true;
	});

	it(`.select(table, where) // where = "id in (1, 2, 3)"`, async () => {
		const where = "id in (1, 2, 3)";
		const result = await my.select(table, where);
		expect(result.length === 3).to.be.true;
	});

	it(`.select(table, where) // where = {username: "thor"}`, async () => {
		const where = {username: "thor"};
		const result = await my.select(table, where);
		expect(result[0].username === "thor").to.be.true;
	});

	it(`.select(table, where) // where = {username: {[Op.like]: "th%"}}`, async () => {
		const Op = my.sequelizeOp;
		const where = {username: {[Op.like]: "th%"}};
		const result = await my.select(table, where);
		expect(result.length === 2).to.be.true;
	});

	it(`.select(table, fields) // fields = "username"`, async () => {
		const fields = "username";
		const result = await my.select(table, fields);
		expect(Object.keys(result[0]).length === 1).to.be.true;
	});

	it(`.select(table, fields) // fields = "id, username"`, async () => {
		const fields = "id, username";
		const result = await my.select(table, fields);
		expect(Object.keys(result[0]).length === 2).to.be.true;
	});

	it(`.select(table, fields) // fields = ["id", "username"]`, async () => {
		const fields = ["id", "username"];
		const result = await my.select(table, fields);
		expect(Object.keys(result[0]).length === 2).to.be.true;
	});

	it(`.select(table, fields, where) // fields = "username", where = "username like 'th%'"`, async () => {
		const fields = "username";
		const where = "username like 'th%'";
		const result = await my.select(table, fields, where);
		expect(Object.keys(result[0]).length === 1 && result.length === 2).to.be.true;
	});

	it(`.select(table, fields, where) // fields = "id, username", where = "username like 'th%'"`, async () => {
		const fields = "id, username";
		const where = "username like 'th%'";
		const result = await my.select(table, fields, where);
		expect(Object.keys(result[0]).length === 2 && result.length === 2).to.be.true;
	});

	it(`.select(table, fields, where) // fields = ["id", "username"], where = "username like 'th%'"`, async () => {
		const fields = ["id", "username"];
		const where = "username like 'th%'";
		const result = await my.select(table, fields, where);
		expect(Object.keys(result[0]).length === 2 && result.length === 2).to.be.true;
	});

	it___________________________();

	it(`.select({table, where}) // where = "username like 'th%'"`, async () => {
		const where = "username like 'th%'";
		const result = await my.select({table, where});
		expect(result.length === 2).to.be.true;
	});

	it(`.select({table, fields}) // fields = "username"`, async () => {
		const fields = "username";
		const result = await my.select({table, fields});
		expect(Object.keys(result[0]).length === 1).to.be.true;
	});

	it(`.select({table, fields}) // fields = "id, username"`, async () => {
		const fields = "id, username";
		const result = await my.select({table, fields});
		expect(Object.keys(result[0]).length === 2).to.be.true;
	});

	it(`.select({table, fields}) // fields = ["id", "username"]`, async () => {
		const fields = ["id", "username"];
		const result = await my.select({table, fields});
		expect(Object.keys(result[0]).length === 2).to.be.true;
	});

	it(`.select({table, fields, where}) // fields = "username", where = "username like 'th%'"`, async () => {
		const fields = "username";
		const where = "username like 'th%'";
		const result = await my.select({table, fields, where});
		expect(Object.keys(result[0]).length === 1 && result.length === 2).to.be.true;
	});

	it(`.select({table, fields, where}) // fields = "id, username", where = "username like 'th%'"`, async () => {
		const fields = "id, username";
		const where = "username like 'th%'";
		const result = await my.select({table, fields, where});
		expect(Object.keys(result[0]).length === 2 && result.length === 2).to.be.true;
	});

	it(`.select({table, fields, where}) // fields = ["id", "username"], where = "username like 'th%'"`, async () => {
		const fields = ["id", "username"];
		const where = "username like 'th%'";
		const result = await my.select({table, fields, where});
		expect(Object.keys(result[0]).length === 2 && result.length === 2).to.be.true;
	});

	it___________________________();

	it(`.select({table, fields, isGroup}) // fields = 'username', isGroup = true`, async () => {
		const fields = 'username';
		const result = await my.select({table, fields, isGroup: true});
		expect(result.length === 7).to.be.true;
	});

	it(`.select({table, fields, group}) // fields = 'username', group = 'username'`, async () => {
		const fields = 'username';
		const result = await my.select({table, fields, isGroup: true});
		expect(result.length === 7).to.be.true;
	});

	it___________________________();

	it(`.select({table, order}) // order = 'username'`, async () => {
		const order = 'username';
		const result = await my.select({table, order});
		expect(result[0].username === 'anthonyStark').to.be.true;
	});

	it(`.select({table, order, limit}) // order = 'username', limit = 3`, async () => {
		const order = 'username';
		const limit = 3;
		const result = await my.select({table, order, limit});
		expect(result.length === 3 && result[0].username === 'anthonyStark').to.be.true;
	});

	it(`.select({table, fields, limit}) // fields = 'username', limit = 3`, async () => {
		const fields = 'username';
		const limit = 3;
		const result = await my.select({table, fields, limit});
		expect(result.length === 3 && result[0].username === 'anthonyStark').to.be.true;
	});

	it(`.select({table, order, limit, offset}) // order = 'username', limit = 3, offset = 2`, async () => {
		const order = 'username';
		const limit = 3;
		const offset = 2;
		const result = await my.select({table, order, limit, offset});
		expect(result.length === 3 && result[0].username === 'natasha').to.be.true;
	});

	it(`.select({table, order, offset}) // order = 'username', offset = 2 (limit = 1)`, async () => {
		const order = 'username';
		const offset = 2;
		const result = await my.select({table, order, offset});
		expect(result.length === 1 && result[0].username === 'natasha').to.be.true;
	});

	it___________________________();

	it(`.select(table, where) // where = {username: "美国队长"}`, async () => {
		const data = {username: '美国队长'};
		await my.insert(table, data);

		const where = data;
		const result = await my.select(table, where);
		expect(result[0].username === "美国队长").to.be.true;
	});

});
