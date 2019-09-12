
const _ = require('../__lib/lodash');
const expect = require('chai').expect;

const nodber = require('../../src');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - base/field', () => {
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

	it(`.isFieldExists()`, async () => {
		const field = 'isAvengers';
		const result = await nodber.isFieldExists(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField()`, async () => {
		const field = 'xxx';
		const type = 'int';
		await nodber.addField(table, field, type);

		const result = await nodber.isFieldExists(table, field);

		await nodber.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.deleteField()`, async () => {
		const field = 'xxx';
		const type = 'int';
		await nodber.addField(table, field, type);
		await nodber.deleteField(table, field);

		const result = await nodber.isFieldExists(table, field);
		expect(result === false).to.be.true;
	});

	it(`.changeField()`, async () => {
		const field = 'xxx';
		const type = 'int';
		await nodber.addField(table, field, type);

		const oldFieldName = field;
		const newFieldName = field + '_123';
		await nodber.changeField(table, oldFieldName, newFieldName);

		const result = await nodber.isFieldExists(table, newFieldName);

		await nodber.deleteField(table, newFieldName);
		expect(result === true).to.be.true;
	});
});
