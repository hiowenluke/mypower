
const moment = require('moment');

// The original date 'Thu Apr 11 2019 18:39:00 GMT+0800' is taken out from the database
// and needs to be formatted as a local format '2019-04-11'
// 		(arr, 'YYYY-MM-DD') // Shorthand. The element of arr must be a string.
// 		(arr, 'workdate') // Shorthand
// 		(arr, ['begindate', 'enddate']) // Shorthand
// 		(arr, {format: 'YYYY-MM-DD', date: ['begindate', 'enddate']})

/** @name nodber.lib.formatDate */
const fn = (arr, options) => {
	if (!arr.length) return arr;

	let format = 'YYYY-MM-DD';
	let dateNames = ['date']; // The default name of the date field

	// Simple processing if the array element is a pure string
	if (typeof arr[0] === 'string') {

		// Short form:
		// (arr, 'YYYY-MM-DD') <= (arr, {format: 'YYYY-MM-DD'})
		if (typeof options === 'string') {
			format = options;
		}

		return arr.map(date => moment(date).format(format));
	}

	// If the array element is an object, the date field for each specified
	// name is processed. Support for the following short form:
	// (arr, ['begindate', 'enddate'])  <= (arr, {date: ['begindate', 'enddate']})

	// If the argument is a string or an array, then it is date
	if (typeof options === 'string' || Array.isArray(options)) {
		dateNames = options;
	}

	// If the argument is an object, it is a standard argument (may have date and/or format arguments)
	else if (options && typeof options === 'object') {
		options.date && (dateNames = options.date);
		options.format && (format = options.format);
	}

	// If date is a string, it is converted to an array (because multiple date fields are to be supported)
	if (typeof dateNames === 'string') {
		dateNames = [dateNames];
	}

	// Process each array element and return the processed array
	return arr.map(row => {
		dateNames.forEach(dateName => {
			const dateValue = row[dateName];
			if (dateValue) {
				row[dateName] = moment(dateValue).format(format);
			}
		});

		return row;
	});
};

module.exports = fn;
