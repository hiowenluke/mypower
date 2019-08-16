
const nodber = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');

describe('MySQL - base/records', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();
	tools.breakLine();

	it(`.getMaxFieldValue(table, field)`, async () => {
		const field = 'id';
		const result = await nodber.getMaxFieldValue(table, field);
		expect(result === 7).to.be.true;
	});

	it(`.getMaxFieldValue(table, field, where)`, async () => {
		const field = 'id';
		const where = 'username like "an%"';
		const result = await nodber.getMaxFieldValue(table, field, where);
		expect(result === 3).to.be.true;
	});

	it(`.getMaxId(table)`, async () => {
		const result = await nodber.getMaxId(table);
		expect(result === 7).to.be.true;
	});

	it(`.getMaxId(table, idName)`, async () => {
		const idName = 'id';
		const result = await nodber.getMaxId(table, idName);
		expect(result === 7).to.be.true;
	});

	it(`.getMaxPrimaryKeyValue(table)`, async () => {
		const result = await nodber.getMaxPrimaryKeyValue(table);
		expect(result === 7).to.be.true;
	});

	it(`.getMaxRecord(table)`, async () => {
		const result = await nodber.getMaxRecord(table);
		expect(result.id === 7).to.be.true;
	});

	it(`.getMaxRecord(table, field)`, async () => {
		const field = 'username';
		const result = await nodber.getMaxRecord(table, field);
		expect(result.id === 4).to.be.true;
	});

	it(`.getMaxRecord(table, field, where)`, async () => {
		const field = 'username';
		const where = 'id < 5';
		const result = await nodber.getMaxRecord(table, field, where);
		expect(result.id === 4).to.be.true;
	});

	it(`.getMinFieldValue(table, field)`, async () => {
		const field = 'id';
		const result = await nodber.getMinFieldValue(table, field);
		expect(result === 1).to.be.true;
	});

	it(`.getMinFieldValue(table, field, where)`, async () => {
		const field = 'id';
		const where = 'username like "an%"';
		const result = await nodber.getMinFieldValue(table, field, where);
		expect(result === 3).to.be.true;
	});

	it(`.getMinId(table)`, async () => {
		const result = await nodber.getMinId(table);
		expect(result === 1).to.be.true;
	});

	it(`.getMinId(table, idName)`, async () => {
		const idName = 'id';
		const result = await nodber.getMinId(table, idName);
		expect(result === 1).to.be.true;
	});

	it(`.getMinRecord(table)`, async () => {
		const result = await nodber.getMinRecord(table);
		expect(result.id === 1).to.be.true;
	});

	it(`.getMinRecord(table, field)`, async () => {
		const field = 'username';
		const result = await nodber.getMinRecord(table, field);
		expect(result.id === 3).to.be.true;
	});

	it(`.getMinRecord(table, field, where)`, async () => {
		const field = 'username';
		const where = 'id > 3';
		const result = await nodber.getMinRecord(table, field, where);
		expect(result.id === 5).to.be.true;
	});

	it(`.isRecordExists()`, async () => {
		const result = await nodber.isRecordExists(table);
		expect(result === true).to.be.true;
	});

	it(`.recordsCount()`, async () => {
		const result = await nodber.recordsCount(table);
		expect(result === 7).to.be.true;
	});

});