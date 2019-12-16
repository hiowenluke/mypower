
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

	// Remove the empty (undefined or null) arguments at the ending
	// [tableName, undefined, null] => [tableName]
	while (args[args.length - 1] === undefined || args[args.length - 1] === null) {
		args.pop();
	}

	if (args.length === 0) {
		return;
	}

	if (args.length === 1) {
		const a0 = args[0];

		// ({table, fields, where})
		if (a0 && typeof a0 === "object") {
			({table, fields, where} = a0);
		}
		else {
			// (table)
			if (typeof a0 === 'string') {
				table = a0;
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

			let a1 = args[1];
			let isfields;

			// (table, {id: 1})
			if (_.isPlainObject(a1)) {
				isfields = false;
			}
			else {
				// (table, ['f1', 'f2', ...])
				if (Array.isArray(a1)) {
					isfields = true;
				}
				else {
					if (typeof a1 === 'string') {

						// (table, 'f_1')
						if (/^\w+$/.test(a1)) {
							isfields = true;
						}
						else {

							// (table, 'f1, f2')
							if (a1.indexOf(',') >= 0 && a1.indexOf('(') === -1) {
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
				fields = a1;
			}
			else {
				where = a1;
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
				throw new Error('Too many arguments. Please use ({table, fields, where, ... }) instead of (table, fields, where, ...).');
			}
		}
	}

	return fixArgs({tableName: table, fieldNames: fields, whereStr: where});
};

module.exports = fn;
