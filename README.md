
# MyPower

A set of database common operations functions for MySQL.

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

### Some examples

```js
const demo = async () => {
    await my.createDatabase('myTestDatabase');
};

```


## List of Functions

### server

my.connectServer()
my.isServerOnline()
my.switchToServer()


### Manager

my.backupAllDatabases()
my.backupDatabase()
my.cloneDatabase()
my.cloneDatabaseStructure()
my.renameDatabase()
my.restoreAllDatabases()
my.restoreDatabase()


### database

my.createDatabase()
my.deleteDatabase()
my.dropDatabase()
my.getDatabasesName()
my.getSelectedDatabase()
my.isDatabaseExists()
my.showDatabases()
my.useDatabase()


### Field

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


### PrimaryKey

my.addPrimaryKey()
my.addPrimaryKeys()
my.getPrimaryKey()
my.getPrimaryKeys()


### Record

my.getMaxFieldValue()
my.getMaxId()
my.getMaxPrimaryKeyValue()
my.getMaxRecord()
my.getMinFieldValue()
my.getMinId()
my.getMinRecord()
my.isRecordExists()
my.recordsCount()


### System

my.getSystemVariable()
my.getSystemVariables()
my.getVersion()
my.getWarningCount()
my.isSuccessful()


### Table

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


### query

my.exec()
my.execSp()
my.count()


#### Crud

my.delete()
my.insert()
my.select()
my.update()


#### Batch

my.batchDelete()
my.batchInsert()
my.batchUpdate()


#### Goto

my.next()
my.previous()


#### Paging

my.page()
my.pageBySql()

