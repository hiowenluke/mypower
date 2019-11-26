
const _ = require('../__lib/lodash');
const expect = require('chai').expect;

const my = require('../../src');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - base/primary key', () => {
	const table = 'users';

	my.init(config);
	prepareForTesting();

	it(`.getPrimaryKey()`, async () => {
		const result = await my.getPrimaryKey(table);
		expect(result === 'id').to.be.true;
	});

	it(`.getPrimaryKeys()`, async () => {
		const result = await my.getPrimaryKeys(table);
		const comparisonData = ['id', 'username'];
		expect(_.isEqualArray(result, comparisonData)).to.be.true;
	});

});
