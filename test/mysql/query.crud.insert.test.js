
const expect = require('chai').expect;

const my = require('../../src');
const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - query/crud/insert', () => {
	const table = 'users';

	my.init(config);
	prepareForTesting();

	it(`.insert(table, data) // data = {username: 'haha'}`, async () => {
		const data = {username: 'haha'};
		const result = await my.insert(table, data);
		expect(typeof result === "number").to.be.true;
	});

	it(`.insert(table, data) // data = {username: '美国队长'}`, async () => {
		const data = {username: '美国队长'};
		const result = await my.insert(table, data);
		expect(typeof result === "number").to.be.true;
	});

	it(`.insert(table, data) // data = {username: 'hi', memo: 'included " here'}`, async () => {
		const data = {username: 'hi', memo: 'included " here'};
		const result = await my.insert(table, data);
		expect(typeof result === "number").to.be.true;
	});

});
