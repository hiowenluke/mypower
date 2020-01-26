
const expect = require('chai').expect;

const my = require('../../src');
const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - query/crud/insert', () => {
	const table = 'users';

	my.init(config);
	prepareForTesting();

	it(`.insert(table, data) // data = {username: 'jerry'}`, async () => {
		const maxId = await my.getMaxId(table);

		const data = {username: 'jerry'};
		await my.insert(table, data);

		const newMaxId = await my.getMaxId(table);
		expect(newMaxId - maxId === 1).to.be.true;
	});

	it(`.insert(table, data, isReturnNewId) // data = {username: 'tom'}, isReturnNewId = true`, async () => {
		const maxId = await my.getMaxId(table);

		const data = {username: 'tom'};
		const isReturnNewId = true;
		const newMaxId = await my.insert(table, data, isReturnNewId);

		expect(newMaxId - maxId === 1).to.be.true;
	});

	// for Unicode
	it(`.insert(table, data) // data = {username: '美国队长'}`, async () => {
		const maxId = await my.getMaxId(table);

		const data = {username: '美国队长'};
		await my.insert(table, data);

		const newMaxId = await my.getMaxId(table);
		expect(newMaxId - maxId === 1).to.be.true;
	});

	it(`.insert(table, data) // data = {username: 'hi', memo: 'included " here'}`, async () => {
		const maxId = await my.getMaxId(table);

		const data = {username: 'hi', memo: 'included " here'};
		await my.insert(table, data);

		const newMaxId = await my.getMaxId(table);
		expect(newMaxId - maxId === 1).to.be.true;
	});

});
