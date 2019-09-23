
const my = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - query/goto', () => {
	const table = 'users';

	itInit();
	it___________________________();

	it(`.previous(table, idValue)`, async () => {
		const idValue = 3;
		const result = await my.previous(table, idValue);
		expect(result.id === 2).to.be.true;
	});

	it(`.previous(table, idName, idValue)`, async () => {
		const idName = 'id';
		const idValue = 3;
		const result = await my.previous(table, idName, idValue);
		expect(result.id === 2).to.be.true;
	});

	it(`.next(table, idValue)`, async () => {
		const idValue = 3;
		const result = await my.next(table, idValue);
		expect(result.id === 4).to.be.true;
	});

	it(`.next(table, idName, idValue)`, async () => {
		const idName = 'id';
		const idValue = 3;
		const result = await my.next(table, idName, idValue);
		expect(result.id === 4).to.be.true;
	});

});
