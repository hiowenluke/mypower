
const expect = require('chai').expect;

const my = require('../../src');
const config = require('../__config/default');
const tools = require('../__tools');
const {prepareForTesting, _________________} = tools;

describe('MySQL - query/exec', async () => {
	const userTableName = config.testOptions.userTableName;

	my.init(config);
	prepareForTesting();

	it(`.exec(sql)`, async () => {
		const sql = `select * from ${userTableName}`;
		const result = await my.exec(sql);
		expect(result[0].id === 1).to.be.true;
	});

});
