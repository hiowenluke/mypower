
/** @name utils.sqlReplacement */
const fn = (sql, data) => {
	if (!data) return sql;

	// Fetch params from sql, instead of Object.keys(data)
	sql = sql.replace(/:(\S*?(?=[\s,)$]))/g, (match, capture) => {
		return data[capture] ? '"' + data[capture].replace('"', '\\"') + '"' : null;
	});

	return sql;
};

module.exports = fn;
