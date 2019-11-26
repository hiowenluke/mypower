
const _ = require('../__lib/lodash');
const expect = require('chai').expect;

const my = require('../../src');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - base/field', () => {
	const table = 'users';

	prepareForTesting();
	_________________();

	it(`.getAutoIdName(table)`, async () => {
		const result = await my.getAutoIdName(table);
		expect(result === 'id').to.be.true;
	});

	it(`.getFieldNames(table)`, async () => {
		const result = await my.getFieldNames(table);
		expect(result.length > 1 && result.indexOf('id') >= 0).to.be.true;
	});

	it(`.getFieldNamesWithoutAutoId(table)`, async () => {
		const result = await my.getFieldNamesWithoutAutoId(table);
		expect(!result.find(item => item === 'id')).to.be.true;
	});

	it(`.getFieldsInfo(table)`, async () => {
		const result = await my.getFieldsInfo(table);
		expect(result.length > 1 && !!result.find(item => item.column_name === 'areaId')).to.be.true;
	});

	it(`.isFieldExists()`, async () => {
		const field = 'isAvenger';
		const result = await my.isFieldExists(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeStr = 'varchar(100)'`, async () => {
		const field = 'xxx';
		const typeStr = 'varchar(100)';
		await my.addField(table, field, typeStr);

		const result = await my.isFieldExists(table, field);

		await my.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeDef = {type: 'varchar', length: 100}`, async () => {
		const field = 'xxx';
		const typeDef = {type: 'varchar', length: 100};
		await my.addField(table, field, typeDef);

		const result = await my.isFieldExists(table, field);

		await my.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeStr = 'int'`, async () => {
		const field = 'xxx';
		const typeStr = 'int';
		await my.addField(table, field, typeStr);

		const result = await my.isFieldExists(table, field);

		await my.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeDef = {type: 'int'}`, async () => {
		const field = 'xxx';
		const typeDef = {type: 'int'};
		await my.addField(table, field, typeDef);

		const result = await my.isFieldExists(table, field);

		await my.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeStr = 'float(10, 2)'`, async () => {
		const field = 'xxx';
		const typeStr = 'float(10, 2)';
		await my.addField(table, field, typeStr);

		const result = await my.isFieldExists(table, field);

		await my.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.addField() // typeDef = {type: 'float', m: 10, d: 2}`, async () => {
		const field = 'xxx';
		const typeDef = {type: 'float', m: 10, d: 2};
		await my.addField(table, field, typeDef);

		const result = await my.isFieldExists(table, field);

		await my.deleteField(table, field);
		expect(result === true).to.be.true;
	});

	it(`.deleteField()`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await my.addField(table, field, typeDef);
		await my.deleteField(table, field);

		const result = await my.isFieldExists(table, field);
		expect(result === false).to.be.true;
	});

	it(`.changeFieldName()`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await my.addField(table, field, typeDef);

		const oldFieldName = field;
		const newFieldName = field + '_123';
		await my.changeFieldName(table, oldFieldName, newFieldName);

		const result = await my.isFieldExists(table, newFieldName);

		await my.deleteField(table, newFieldName);
		expect(result === true).to.be.true;
	});

	it(`.changeFieldType() // varchar(100) => text`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await my.addField(table, field, typeDef);

		const newFieldTypeDef = 'text';
		await my.changeFieldType(table, field, newFieldTypeDef);

		const result = await my.getFieldTypeStr(table, field);

		await my.deleteField(table, field);
		expect(result === 'text(65535)').to.be.true;
	});

	it(`.changeFieldType() // varchar(100) => int`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await my.addField(table, field, typeDef);

		const newFieldTypeDef = 'int';
		await my.changeFieldType(table, field, newFieldTypeDef);

		const result = await my.getFieldTypeStr(table, field);

		await my.deleteField(table, field);
		expect(result === 'int(10)').to.be.true;
	});

	it(`.changeFieldType() // varchar(100) => float(10, 2)`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await my.addField(table, field, typeDef);

		const newFieldTypeDef = 'float(10, 2)';
		await my.changeFieldType(table, field, newFieldTypeDef);

		const result = await my.getFieldTypeStr(table, field);

		await my.deleteField(table, field);
		expect(result === 'float(10, 2)').to.be.true;
	});

	it(`.changeField() or .updateField()`, async () => {
		const field = 'xxx';
		const typeDef = 'varchar(100)';
		await my.addField(table, field, typeDef);

		const oldFieldName = field;
		const newFieldName = field + '_123';
		const newFieldTypeDef = 'text';
		await my.changeField(table, oldFieldName, newFieldName, newFieldTypeDef);
		// await my.updateField(table, oldFieldName, newFieldName, newFieldTypeDef);

		const result = await my.getFieldTypeStr(table, newFieldName);

		await my.deleteField(table, newFieldName);
		expect(result === 'text(65535)').to.be.true;
	});

	it(`.addFields()`, async () => {
		const fieldDefs = [
			{name: 'f1', type: 'varchar', length: 100},
			{name: 'f2', type: 'int'},
			{name: 'f3', type: 'float', m: 10, d: 2},
		];
		await my.addFields(table, fieldDefs);

		const result = await my.isFieldExists(table, 'f1');

		await my.deleteFields(table, fieldDefs);
		expect(result === true).to.be.true;
	});

	it(`.deleteFields()`, async () => {
		const fieldDefs = [
			{name: 'f1', type: 'varchar', length: 100},
			{name: 'f2', type: 'int'},
			{name: 'f3', type: 'float', m: 10, d: 2},
		];
		await my.addFields(table, fieldDefs);
		await my.deleteFields(table, fieldDefs);

		const result = await my.isFieldExists(table, 'f1');
		expect(result === false).to.be.true;
	});

	it(`.changeFields() or .updateFields()`, async () => {
		const fieldDefs = [
			{name: 'f1', type: 'varchar', length: 100},
			{name: 'f2', type: 'int'},
			{name: 'f3', type: 'float', m: 10, d: 2},
		];
		await my.addFields(table, fieldDefs);

		const updateFieldDefs = [
			{name: 'f1', newDef: {name: 'xxx', type: 'text'}},
			{name: 'f2', newDef: {type: 'tinyint'}},
			{name: 'f3', newDef: {type: 'double', m: 8, d: 6}},
		];
		await my.changeFields(table, updateFieldDefs);
		// await my.updateFields(table, updateFieldDefs);

		const result = await my.isFieldExists(table, 'xxx');

		await my.deleteFields(table, 'xxx,f2,f3'.split(','));
		expect(result === true).to.be.true;
	});

});
