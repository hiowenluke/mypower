
/** @name my.wait */
const fn = (ms = 10) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};

module.exports = fn;
