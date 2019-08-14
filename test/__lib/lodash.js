
const _ = require('lodash');

_.isEqualArray = (result, comparisonData) => {
	return _.isEqual(_.sortBy(result), _.sortBy(comparisonData));
};

module.exports = _;
