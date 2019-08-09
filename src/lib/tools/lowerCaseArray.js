
/** @name nodber.lowerCaseArray */
const fn = (array) => {
	return array.map(ele => typeof ele === 'string' && (ele.toLowerCase()));
};

module.exports = fn;
