
const _ = require('../__lib/lodash');
const expect = require('chai').expect;

const nodber = require('../../src');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - base/fields', () => {
	const table = 'users';

	itInit();
	it___________________________();

	it(`.getAutoIdName(table)`, async () => {
		const result = await nodber.getAutoIdName(table);
		expect(result === 'id').to.be.true;
	});

	it(`.getFieldNames(table)`, async () => {
		const result = await nodber.getFieldNames(table);
		expect(result.length > 1 && result[0] === 'id').to.be.true;
	});

	it(`.getFieldNamesWithoutAutoId(table)`, async () => {
		const result = await nodber.getFieldNamesWithoutAutoId(table);
		expect(!result.find(item => item === 'id')).to.be.true;
	});

	it(`.getFieldsInfo(table)`, async () => {
		const result = await nodber.getFieldsInfo(table);
		expect(result.length > 1 && result[0].column_name === 'id').to.be.true;
	});

	it(`.getPrimaryKey()`, async () => {
		const result = await nodber.getPrimaryKey(table);
		expect(result === 'id').to.be.true;
	});

	it(`.getPrimaryKeys()`, async () => {
		const result = await nodber.getPrimaryKeys(table);
		const comparisonData = ['id', 'username'];
		expect(_.isEqualArray(result, comparisonData)).to.be.true;
	});

	it(`.isFieldExists()`, async () => {
		const field = 'isAvengers';
		const result = await nodber.isFieldExists(table, field);
		expect(result === true).to.be.true;
	});

});
