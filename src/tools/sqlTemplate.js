
// For {xxx}

/** @name nodber.sqlTemplate */
const fn = (sqlTemplate, data) => {
	if (!data || typeof data !== 'object') {
		throw new Error('Require data arguments, and it is must be an object');
	}

	let sql = sqlTemplate;
	Object.keys(data).forEach(key => {
		const reg = new RegExp(`{${key}}`, 'ig');
		sql = sql.replace(reg, data[key]);
	});

	return sql;
};

module.exports = fn;
