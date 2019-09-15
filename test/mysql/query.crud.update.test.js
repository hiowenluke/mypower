
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - query/crud/update', () => {
	const table = 'users';

	itInit();
	it___________________________();

	it(`.update(table, data, where) // data = {username: 'haha'}, where = 'id = 1'`, async () => {
		const newValues = {username: 'haha'};
		const where = 'id = 1';
		const oldValues = await nodber.select(table, where);

		await nodber.update(table, newValues, where);

		const result = await nodber.select(table, where);
		expect(result[0].username === newValues.username && result[0].memo === oldValues[0].memo).to.be.true;
	});

	it(`.update(table, data, where) // data = {username: 'haha'}, where = 'id = 1'`, async () => {
		const newValues = {username: 'haha'};
		const where = 'id = 1';
		const result = await nodber.update(table, newValues, where);

		// The result will be 0, 'cause we do the same for the same record twice
		expect(result === 0).to.be.true;
	});

	it(`.update(table, data, where) // data = {username: 'haha'}, where = {id: 2}`, async () => {
		const newValues = {username: 'haha'};
		const where = {id: 2};
		const result = await nodber.update(table, newValues, where);
		expect(result === 1).to.be.true;
	});

	it(`.update(table, data) // data = {username: 'haha'}`, async () => {
		const newValues = {username: 'haha'};
		const result = await nodber.update(table, newValues);
		expect(result === 5).to.be.true;
	});

});
