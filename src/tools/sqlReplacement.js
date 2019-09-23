
// For :xxx

/** @name my.sqlReplacement */
const fn = (sql, data = {}) => {

	// Fetch params from sql, instead of Object.keys(data)
	sql = sql.replace(/:(\S*?(?=[\s,)$]))/g, (match, capture) => {
		let val = data[capture];

		if (typeof val === 'undefined') {
			val = null;
		}
		else {
			if (typeof val === 'string') {
				val = '"' + val.replace('"', '\\"') + '"';
			}
		}

		return val;
	});

	return sql;
};

module.exports = fn;
