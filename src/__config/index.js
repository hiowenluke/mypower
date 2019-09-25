
const sequery = require('sequelize-raw-query');
const myCli = require('mysql-cli-exec');

const me = {
	dialect: 'mysql',
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

	// If it is true, show the commands in cli. It is for mysql-cli-exec.
	isShowCliCommands: false,

	init(...args) {
		this.set(...args);
	},

	set(config) {
		Object.assign(this, config);

		const data = this.get();
		sequery.init(data);
		myCli.init(data);
	},

	get() {
		const data = {};
		Object.keys(this).forEach(key => {
			if (typeof this[key] === 'function') return;
			data[key] = this[key];
		});
		return data;
	},

	setIsShowCliCommands(val = true) {
		this.set({isShowCliCommands: val});
	},

	getIsShowCliCommands() {
		return this.get().isShowCliCommands;
	}
};

module.exports = me;
