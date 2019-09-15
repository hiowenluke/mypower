
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - query/crud/insert', () => {
	const table = 'users';

	itInit();
	it___________________________();

	it(`.insert(table, data) // data = {username: 'haha'}`, async () => {
		const data = {username: 'haha'};
		const result = await nodber.insert(table, data);
		expect(typeof result === "number").to.be.true;
	});

	it(`.insert(table, data) // data = {username: '美国队长'}`, async () => {
		const data = {username: '美国队长'};
		const result = await nodber.insert(table, data);
		expect(typeof result === "number").to.be.true;
	});

	it(`.insert(table, data) // data = {username: 'hi', memo: 'included " here'}`, async () => {
		const data = {username: 'hi', memo: 'included " here'};
		const result = await nodber.insert(table, data);
		expect(typeof result === "number").to.be.true;
	});

});