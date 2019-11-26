
# MyPower

A set of database common operations functions for MySQL. In particular, you can operate the database on the specified server, the operations include create, delete, drop, use, backup, restore, clone.

## Installation

Install:
```sh
npm i mypower --save
```

Test:
```sh
git clone https://github.com/hiowenluke/mypower
cd mypower
npm test
```

## Usage

### Initialize

Initialize mypower first:
```js
// Your mysql configuration
const config = {
	database: 'sys',
	username: 'root',
	password: 'playboy',
	host: '127.0.0.1',
	port: 3306,
};

const my = require('mypower');
my.init(config);
```

**Click below links to see usages (from test cases).**
**The asterisk indicates that the database on the specified server can be operated.**


### [Server](./test/mysql/server.test.js)

* my.connectServer() *
* my.isServerOnline() *
* my.switchToServer() *


### [Manager](./test/mysql/manager.test.js)

my.backupAllDatabases() *
my.backupDatabase() *
my.cloneDatabase() *
my.cloneDatabaseStructure() *
my.renameDatabase()
my.restoreAllDatabases() *
my.restoreDatabase() *


### [Database](./test/mysql/base.database.test.js)

my.createDatabase() *
my.deleteDatabase() *
my.dropDatabase() *
my.getDatabasesName() *
my.getSelectedDatabase() *
my.isDatabaseExists() *
my.showDatabases() *
my.useDatabase() *


### [Field](./test/mysql/base.field.test.js)

my.addField()
my.addFields()
my.changeField()
my.changeFieldName()
my.changeFieldType()
my.changeFields()
my.convertFieldTypeDefToStr()
my.deleteField()
my.deleteFields()
my.fieldTypes
my.getAutoIdName()
my.getFieldNames()
my.getFieldNamesWithoutAutoId()
my.getFieldType()
my.getFieldTypeStr()
my.getFieldsInfo()
my.isFieldExists()
my.updateField()
my.updateFields()


### [PrimaryKey](./test/mysql/base.primaryKey.test.js)

my.addPrimaryKey()
my.addPrimaryKeys()
my.getPrimaryKey()
my.getPrimaryKeys()


### [Record](./test/mysql/base.record.test.js)

my.getMaxFieldValue()
my.getMaxId()
my.getMaxPrimaryKeyValue()
my.getMaxRecord()
my.getMinFieldValue()
my.getMinId()
my.getMinRecord()
my.isRecordExists()
my.recordsCount()


### [System](./test/mysql/base.system.test.js)

my.getSystemVariable()
my.getSystemVariables()
my.getVersion()
my.getWarningCount()
my.isSuccessful()


### [Table](./test/mysql/base.table.test.js)

my.cloneTable()
my.cloneTableStructure()
my.copyTableData()
my.createTable()
my.deleteTable()
my.deleteTables()
my.descTable()
my.dropTable()
my.dropTables()
my.isEmptyTable()
my.isTableExists()
my.moveTable()
my.renameTable()
my.showTables()
my.truncateTable()


### Query

[my.exec()](./test/mysql/query.exec.test.js)
my.execSp()
my.count()


#### Crud

[my.delete()](./test/mysql/query.crud.delete.test.js)
[my.insert()](./test/mysql/query.crud.insert.test.js)
[my.select()](./test/mysql/query.crud.select.test.js)
[my.update()](./test/mysql/query.crud.update.test.js)


#### [Goto](./test/mysql/query.goto.test.js)

my.next()
my.previous()


#### Paging

[my.page()](./test/mysql/query.page.page.test.js)
[my.pageBySql()](./test/mysql/query.page.pageBySql.test.js)


## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke
