
const expect = require('chai').expect;
const nodber = require('../../src');
const config = require('../__config/default');

describe('NoDBer', async () => {

	const table = '(select 1 as id union select 2 union select 3)';

	it('init', async () => {

		// We can use any of the configurations of mssql and mysql for this test cases file.
		nodber.init(config.use('mssql'));
	});

	it(`.exec(sql)`, async () => {
		const sql = `select * from ${table} m`;
		const result = await nodber.exec(sql);
		expect(result[0].id === 1).to.be.true;
	});

});
