
const nodber = require('../../');

/** @name nodber.convertFieldTypeDefToStr */
const fn = ({type, length, m, d} = {}) => {
	if (!type) return '';

	let str;

	// *char, *char(100)
	if (nodber.fieldTypes.isChar(type)) {
		length = length || nodber.fieldTypes.defaultLength[type];
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
