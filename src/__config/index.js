
const me = {
	database: 'sys',
	username: 'root',
	password: 'playboy',
	host: '127.0.0.1',
	port: 3306,

	// If it is true, save the data to global for sequelize-raw-query.
	// 		If the user project includes multiple subprojects, it is needed to enable global mode.
	// 		Otherwise, since the sequelize in each subproject is a different instance
	// 		and cannot share the same data, it will cause an error.
	enableGlobal: false,

	init(...args) {
		this.set(...args);
	},

	set(config) {
		Object.assign(this, config);
	},

	get() {
		return this;
	}
};

module.exports = me;
