
/** @name lib.calcLimitByPageInfo */
const fn = (pageNumber, pageSize) => {
	pageNumber = pageNumber - 0;
	pageSize = pageSize ? pageSize - 0 : 10;

	const offset = (pageNumber - 1) * pageSize;
	const limit = pageSize;

	return {limit, offset};
};

module.exports = fn;
