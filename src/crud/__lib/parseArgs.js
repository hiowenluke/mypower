
// (table)
// ({table, fields, where})

// (table, {id: 1})
// (table, {username: {[Op.like]: "xxx"}})

// (table, ['f1', 'f2', ...])
// (table, 'f1')
// (table, 'f1, f2')
// (table, 'f1 = 1')
// (table, 'f1 = 1 and id in (1, 2)')

const _ = require('lodash');
const fixArgs = require('./fixArgs');

/** @name lib.parseArgs */
const fn = (...args) => {
	let table, fields, where;

	if (args.length === 0) {
		return;
	}

	if (args.length === 1) {
		const arg = args[0];

		// ({table, fields, where})
		if (typeof arg === "object") {
			({table, fields, where} = arg);
		}
		else {
			// (table)
			if (typeof arg === 'string') {
				table = arg;
			}
			else {
				throw new Error("Wrong argument");
			}
		}
	}
	else {

		// (table, ...)
		if (args.length === 2) {
			table = args[0];

			let arg = args[1];
			let isfields;

			// (table, {id: 1})
			if (_.isPlainObject(arg)) {
				isfields = false;
			}
			else {
				// (table, ['f1', 'f2', ...])
				if (Array.isArray(arg)) {
					isfields = true;
				}
				else {
					if (typeof arg === 'string') {

						// (table, 'f_1')
						if (/^\w+$/.test(arg)) {
							isfields = true;
						}
						else {

							// (table, 'f1, f2')
							if (arg.indexOf(',') >= 0 && arg.indexOf('(') === -1) {
								isfields = true;
							}
							else {
								// (table, 'f1 = 1')
								// (table, 'f1 = 1 and id in (1, 2)')
								isfields = false;
							}
						}
					}
					else {
						throw new Error("Wrong argument");
					}
				}
			}

			if (isfields) {
				fields = arg;
			}
			else {
				where = arg;
			}
		}
		else {

			// (table, fields, where)
			if (args.length === 3) {

				table = args[0];
				fields = args[1];
				where = args[2];
			}
			else {
				throw new Error('Too many arguments. Please use {table, fields, where, ... }.');
			}
		}
	}

	return fixArgs({tableName: table, fieldNames: fields, whereStr: where});
};

module.exports = fn;
