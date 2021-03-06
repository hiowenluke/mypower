
const my = require('../..');

// Three forms of definition:
//		{type: 'varchar', length: 100}
//		{type: 'float', m: 10, d: 2}
//		{type: 'int'}

/** @name my.convertFieldTypeDefToStr */
const fn = (definition) => {
	if (!definition || typeof definition !== 'object') return definition;

	let {type, length, m, d} = definition;
	let str;

	// *char, *char(100)
	if (my.fieldTypes.isChar(type)) {
		length = length || my.fieldTypes.defaultLength[type];
		str = `${type}(${length})`;
	}
	else

	if (length) {
		// *text(10000), *int(4)
		str = `${type}(${length})`;
	}
	else

	if (m) {
		if (d) {
			if (m < d) {
				// Error message copied from mysql
				throw new Error('For float(M,D), double(M,D) or decimal(M,D), M must be >= D');
			}

			// float(8, 2), double(10, 2), decimal(12, 2)
			str = `${type}(${m}, ${d})`;
		}
		else {
			// float(8), double(10), decimal(12)
			str = `${type}(${m})`;
		}
	}
	else {
		str = `${type}`; // text
	}

	return str;
};

module.exports = fn;
