
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
		expect(result.length > 1 && result.indexOf('id') >= 0).to.be.true;
	});

	it(`.getFieldNamesWithoutAutoId(table)`, async () => {
		const result = await nodber.getFieldNamesWithoutAutoId(table);
		expect(!result.find(item => item === 'id')).to.be.true;
	});

	it(`.getFieldsInfo(table)`, async () => {
		const result = await nodber.getFieldsInfo(table);
		expect(result.length > 1 && !!result.find(item => item.column_name === 'areaId')).to.be.true;
	});

	it(`.isFieldExists()`, async () => {
		const field = 'isAvenger';
		const result = await nodber.isFieldExists(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeStr = 'varchar(100)'`, async () => {
		const field = 'xxx';
		const typeStr = 'varchar(100)';
		await nodber.addField(table, field, typeStr);

		const result = await nodber.isFieldExists(table, field);

		await nodber.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeDef = {type: 'varchar', length: 100}`, async () => {
		const field = 'xxx';
		const typeDef = {type: 'varchar', length: 100};
		await nodber.addField(table, field, typeDef);

		const result = await nodber.isFieldExists(table, field);

		await nodber.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeStr = 'int'`, async () => {
		const field = 'xxx';
		const typeStr = 'int';
		await nodber.addField(table, field, typeStr);

		const result = await nodber.isFieldExists(table, field);

		await nodber.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeDef = {type: 'int'}`, async () => {
		const field = 'xxx';
		const typeDef = {type: 'int'};
		await nodber.addField(table, field, typeDef);

		const result = await nodber.isFieldExists(table, field);

		await nodber.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeStr = 'float(10, 2)'`, async () => {
		const field = 'xxx';
		const typeStr = 'float(10, 2)';
		await nodber.addField(table, field, typeStr);

		const result = await nodber.isFieldExists(table, field);

		await nodber.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeDef = {type: 'float', m: 10, d: 2}`, async () => {
		const field = 'xxx';
		const typeDef = {type: 'float', m: 10, d: 2};
		await nodber.addField(table, field, typeDef);

		const result = await nodber.isFieldExists(table, field);

		await nodber.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.deleteField()`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await nodber.addField(table, field, typeDef);
		await nodber.deleteField(table, field);

		const result = await nodber.isFieldExists(table, field);
		expect(result === false).to.be.true;
	});

	it(`.changeFieldName()`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await nodber.addField(table, field, typeDef);

		const oldFieldName = field;
		const newFieldName = field + '_123';
		await nodber.changeFieldName(table, oldFieldName, newFieldName);

		const result = await nodber.isFieldExists(table, newFieldName);

		await nodber.deleteField(table, newFieldName);
		expect(result === true).to.be.true;
	});

	it(`.changeFieldType()`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await nodber.addField(table, field, typeDef);

		const newFieldTypeDef = 'text';
		await nodber.changeFieldType(table, field, newFieldTypeDef);

		const result = await nodber.getFieldTypeStr(table, field);

		await nodber.deleteField(table, field);
		expect(result === 'text(65535)').to.be.true;
	});

	it(`.changeField() or .updateField()`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await nodber.addField(table, field, typeDef);

		const oldFieldName = field;
		const newFieldName = field + '_123';
		const newFieldTypeDef = 'text';
		await nodber.changeField(table, oldFieldName, newFieldName, newFieldTypeDef);

		const result = await nodber.getFieldTypeStr(table, newFieldName);

		await nodber.deleteField(table, newFieldName);
		expect(result === 'text(65535)').to.be.true;
	});

	it(`.addFields()`, async () => {
		const fieldDefs = [
			{name: 'f1', type: 'varchar', length: 100},
			{name: 'f2', type: 'int'},
			{name: 'f3', type: 'float', m: 10, d: 2},
		];
		await nodber.addFields(table, fieldDefs);

		const result = await nodber.isFieldExists(table, 'f1');

		await nodber.deleteFields(table, fieldDefs);
		expect(result === true).to.be.true;
	});

	it(`.deleteFields()`, async () => {
		const fieldDefs = [
			{name: 'f1', type: 'varchar', length: 100},
			{name: 'f2', type: 'int'},
			{name: 'f3', type: 'float', m: 10, d: 2},
		];
		await nodber.addFields(table, fieldDefs);
		await nodber.deleteFields(table, fieldDefs);

		const result = await nodber.isFieldExists(table, 'f1');
		expect(result === false).to.be.true;
	});

	it(`.changeFields() or .updateFields()`, async () => {
		const fieldDefs = [
			{name: 'f1', type: 'varchar', length: 100},
			{name: 'f2', type: 'int'},
			{name: 'f3', type: 'float', m: 10, d: 2},
		];
		await nodber.addFields(table, fieldDefs);

		const updateFieldDefs = [
			{name: 'f1', newDef: {name: 'xxx', type: 'text'}},
			{name: 'f2', newDef: {type: 'tinyint'}},
			{name: 'f3', newDef: {type: 'double', m: 4, d: 6}},
		];
		await nodber.changeFields(table, updateFieldDefs);

		const result = await nodber.isFieldExists(table, 'xxx');

		await nodber.deleteFields(table, 'xxx,f2,f3'.split(','));
		expect(result === false).to.be.true;
	});

});
